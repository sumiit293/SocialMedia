const formidable = require("formidable");
const path = require("path");
const { moveFile, fileFilter } = require("./../utility/file_operation");
const Post = require("./../models/Post");
const Profile = require("./../models/Profile");
const Comment = require("./../models/Comment");

exports.post = async (req, res, next) => {
    const form = formidable({ multiples: true });
    var profile;
    try {
        profile = await Profile.findOne({ user: req.user.id });
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: "Can't upload post something went wrong" })
    }
    form.parse(req, async (err, fields, files) => {
        if (err) {
            next(err);
            return res.status(500).json({ error: "Something went wrong" });
        }

        !!files.photo.length > 1 && files.photo.map( (file,index) => {
            const result = fileFilter(file);
            if (!result.value) {
                return res.status(400).json({ error: result.msg })
            }
        })
        
        //for more than one file
        if (files.photo.length > 1) {
            var i = 0;
            var fileHolder = [];
            while(i < files.photo.length){
                const fileName = Math.random().toFixed(3) * 1000 + Date.now() + path.extname(files.photo[i].name);
                const value = await moveFile(process.env.AWS_BUCKET2_NAME,files.photo[i].path, fileName)
                fileHolder[i] = value;
                i++;
            }

            const newPost = new Post({
                title: fields.title,
                content: fields.content,
                user: req.user.id,
                profile: profile._id,
                images: fileHolder
            })  
            try {
                const post = await newPost.save();
                await Profile.findOneAndUpdate({user: req.user.id},{$push: {posts: post._id}})
                return res.json({ post: post })
            }
            catch (error) {
                console.log(error);
                return res.status(500).json({ error: "Could not save the post in Db" })
            }


        } else {
            // for single file only
            const result = fileFilter(files.photo);
            if (!result.value) {
                return res.status(400).json({ error: result.msg })
            }
            const fileName = Date.now() + path.extname(files.photo.name);
            moveFile(process.env.AWS_BUCKET2_NAME,files.photo.path, fileName)
            .then(async (filelink)=> {
            const newPost = new Post({
                title: fields.title,
                content: fields.content,
                user: req.user.id,
                profile: profile._id,
                images: [filelink]
                })
                try {
                    const post = await newPost.save();
                    const profile = await Profile.findOneAndUpdate({user:req.user.id}, { $push: { posts: post._id } });
                    console.log(profile);
                    return res.json({post: post})
                } catch (error) {
                    console.log(error);
                    return res.status(500).json({error: "could made post something went wrong !"});
                }
            })
            .catch((error)=> {console.log(error) ; return res.status(500).json({ error: "Could not process upload" })})
        }
    });
}

exports.deletePost = async (req, res) => {
    try {
        const post = Post.findOne({ _id: req.params.id });
        await post.delete()
        return res.json({ msg: "Post deleted successfully " })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: "Could not delete the post something went wrong" })
    }
}

exports.getAllPost = async (req, res) => {
    try {
        const posts = await Post.find({ user: req.user.id }).populate({ path: "profile", model: "SM_Profile" });
        //populate([{ path: "comment", model: "SM_Comment", populate: { path: "profile" } }, { path: "profile", model: "SM_Profile" }])
        const postContent = posts.map((post) => {
            const postToBeSent = post
            postToBeSent.profile.bio = undefined,
                postToBeSent.profile.email = undefined,
                postToBeSent.profile.address = undefined,
                postToBeSent.profile.college = undefined,
                postToBeSent.profile.school = undefined,
                postToBeSent.profile.posts = undefined
            return postToBeSent;
        })
        return res.json({ posts: postContent });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Couldn't fetch post !" })
    }
}

exports.getCommentsForPost = async (req, res) => {
    try {
        const commentOfThePost = await Post.findById(req.params.id).populate([{ path: "comment", model: "SM_Comment", populate: { path: "profile" } }])
        res.json({ comment: !!commentOfThePost.comment ? commentOfThePost.comment : [] });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Could not fetch comments !" })
    }
}

exports.addCommentToPost = (req, res) => {
    //creating the new Comment object
    const newComment = new Comment({
        user: req.user.id,
        profile: req.body.profile_id,
        comment: req.body.comment,
        replies: []
    })
    newComment.save((err, data) => {
        if (!err) {
            Post.findByIdAndUpdate(req.body.post_id,
                {
                    $push: {
                        comment: {
                            $each: [data._id],
                            $position: 0
                        }
                    }
                },
                { new: true },
                (err, doc) => {
                    if (err) {
                        console.log(err);
                        return res.status(500).json({ error: " Internal Server Error !" })
                    }
                    return res.json({ comment_id: data._id })
                })
        } else {
            return res.status(500).json({ error: "Could not add comment !" })
        }
    })
}

exports.deleteComment = (req, res) => {
    const { post_id, comment_id } = req.body;
    Post.findByIdAndUpdate(post_id,
        {
            $pull: {
                comment: comment_id
            }
        },
        (err, doc) => {
            if (err) return res.status(500).json({ error: "Could not remove post" })
            Comment.findByIdAndDelete(comment_id, (err, doc) => {
                if (!err) return res.json("Deleted Successfully ")
                return res.status(500).json({ error: "Something went wrong " })
            })
        }
    )
}

exports.likeOrUnlikePost = (req, res) => {
    if (req.body.liked === false) {
        Post.findByIdAndUpdate(req.body.post_id,
            {
                $addToSet: { likes: req.body.profile_id }
            },
            { new: true },
            (err, doc) => {
                if (!err) return res.json({ like: doc.likes.length })
                return res.status(500).json({ error: "Something went wrong !" })
            })
    } else {
        Post.findByIdAndUpdate(req.body.post_id,
            {
                $pull: { likes: req.body.profile_id }
            },
            { new: true },
            (err, doc) => {
                if (!err) return res.json({ like: doc.likes.length })
                return res.status(500).json({ error: "Something went wrong !" })
            })
    }
}
