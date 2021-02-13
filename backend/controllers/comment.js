const Comment = require("./../models/Comment");
const Profile = require("./../models/Profile");

exports.addReplyToComment = (req, res) => {
    Profile.findOne({ user: req.user.id }, (err, profile) => {
        if (err) {
            console.log(err);
            return res.status(400).json({ error: "No profile found " })
        } else {
            Comment.findByIdAndUpdate(req.body.comment_id, {
                $push: {
                    replies: {
                        $each: [{ name: profile._id, value: req.body.reply }],
                        $position: 0
                    }
                }
            }, (err, doc) => {
                if (err) {
                    return res.status(400).json({ error: "Could not add profile " })
                }
                return res.json({ comment_id: doc._id })
            })
        }
    })
}

exports.getAllRepliesForComment = async (req, res) => {
    try {
        const res1 = await Comment.findById(req.params.id).populate([{ path: "replies", populate: { path: "name", model: "SM_Profile" } }])
        return res.json({ replies: res1 })
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "could not fetch reply" })
    }
}

exports.deleteReply = (req, res) => {
    Profile.findOne({ user: req.user.id }, (err, profile) => {
        if (err) {
            console.log(err);
            return res.status(400).json({ error: "No profile found " })
        } else {
            Comment.findByIdAndUpdate(req.body.comment_id, {
                $pull: {
                    replies: {
                        name: profile._id,
                        value: req.body.reply
                    }

                }
            },
                { new: true },
                (err, doc) => {
                    if (err) {
                        return res.status(400).json({ error: "Could not delete reply " })
                    }
                    return res.json({ comment: doc })
                })
        }
    })
}