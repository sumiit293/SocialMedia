const Profile = require("./../models/Profile");
const { moveFile, fileFilter, removeFile } = require("./../utility/file_operation");
const formidable = require("formidable");
const path = require("path");

//for tessting routes
exports.profile = (req, res) => {
    res.json({ info: "I am from profile..." })
    Profile.getCollection
}

// getting the profile
exports.getProfile = async (req, res) => {
    const profile = await Profile.findOne({ user: req.user.id });
    if (!profile) {
        //if no profile create the one for the user
        const newProfile = new Profile({ user: req.user.id, name: req.user.name, email: req.user.email })
        const new_p = await newProfile.save()
        // newProfile.on('es-indexed', function (err, res) {
        //     //if (err) throw err;
        //     console.log(res)
        // });
         return res.json({ profile: new_p })
    }
    else {
        return res.json({ profile: profile })
    }
}

// for adding the cover photo
exports.addCoverPhoto = (req, res, next) => {
    const form = formidable({ multiples: false });
    var fileName;
    form.parse(req, (err, fields, files) => {
        if (err) {
            next(err);
            return res.status(500).json({ error: "Something went wrong" });
        }
        fileName = Date.now() + path.extname(files.cover_photo.name);
        //checking the appropriate file size and extensesion
        const result = fileFilter(files.cover_photo);
        if (result.value) {
            //moving the file to our system
            moveFile(process.env.AWS_BUCKET2_NAME,files.cover_photo.path, fileName)
            .then((filelink) => {
                // now saving in the data base
                Profile.findOneAndUpdate({ user: req.user.id },{coverPic:filelink })
                .then((profile, err) => {
                        if (err) {
                            console.log(err)
                            return res.status(500).json({ error: "Internal server error" })
                        }
                        else{
                            if (!!profile.coverPic) {
                                removeFile(process.env.AWS_BUCKET2_NAME,profile.coverPic)
                                .then(() => {
                                    return res.json({ msg: "Cover photo updated successfully " });
                                })
                                .catch((err)=> console.log(err))
                            } else {
                                return res.json({ msg: "Cover photo updated successfully " });
                            }
                        }
                })
                .catch((err) => {
                    console.log(err);
                     return res.status(500).json({ error: "Profile not found" })
                })
            })
            .catch((error) => {
                console.log(error)
                return res.status(500).json({ error: "Something went wrong" })
            })
        } else {
            return res.status(400).json({ error: result.msg })
        }
    })

}

//adding the profile photo
exports.addProfilePhoto = (req, res, next) => {
    const form = formidable({ multiples: false });
    var fileName;
    form.parse(req, (err, fields, files) => {
        if (err || !files.profile_photo) {
            next(err);
            console.log(files,fields,req);
            return res.status(500).json({ error: "Something went wrong" });
        }
        fileName = Date.now() + path.extname(files.profile_photo.name);
        //checking the appropriate file size and extensesion
        const result = fileFilter(files.profile_photo);
        if (result.value) {
            //moving the file to our system
            moveFile(process.env.AWS_BUCKET1_NAME,files.profile_photo.path, fileName)
            .then((filelink) => {
                // now updating in the data base
                Profile.findOneAndUpdate({ user: req.user.id },{profilePic: filelink})
                    .then((profile, err) => {
                        console.log("Then is called...");
                        if (err) {
                            console.log(err)
                            return res.status(500).json({ error: "Internal server error" })
                        }
                        else { 
                             removeFile(process.env.AWS_BUCKET1_NAME,profile.profilePic)
                                .then((data)=> res.json({ msg: "Profile photo updated successfully " }))
                                .catch((err)=> res.json({ msg: "Profile photo updated successfully " }))
                        }
                        })
                    .catch((err) => {
                        console.log(err);
                        return res.status(500).json({ error: "could not update ..." })
                    })
            }).
            catch((error) => {
                console.log(error)
                return res.status(500).json({ error: "Something went wrong" })
            })
        } else {
            return res.status(400).json({ error: result.msg })
        }
    })
}

//adding the additional profile data
exports.addAdditionalInfo = async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id });
        if (!!req.body.bio) {
            profile.bio = req.body.bio
        }
        if (!!req.body.address) {
            profile.address = req.body.address
        }
        if (!!req.body.school) {
            profile.school = req.body.school
        }
        if (!!req.body.college) {
            profile.college = req.body.college
        }
        await profile.save()
        return res.json({ msg: "Info updated successfully " })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: "Something went wrong " })
    }
}

exports.getBriefInfo = async (req, res) => {
    try {
        const user = await Profile.findOne({ user: req.params.id });
        res.json({ name: user.name, profilePic: user.profilePic, id: user._id });
        return;
    } catch (error) {
        console.log(error);
        res.json({ error: "Something went wrong" });
    }
}