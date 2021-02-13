const router = require("express").Router();
const passport = require("passport");
const { profile, getProfile, addCoverPhoto, addProfilePhoto, addAdditionalInfo, getBriefInfo } = require("./../../controllers/profile");

//GET 
//@ Private
//@ dec api/profile
//Getting the profile info
router.get("/profile", passport.authenticate("jwt", { session: false }), getProfile)

//@ GET 
//@ Private
//@ dec api/get-brief-info/:id
//Getting the profile info
router.get("/get-brief-info/:id", passport.authenticate("jwt", { session: false }), getBriefInfo);

//  POST 
//@ Private
//@ desc api/profilr
//For testing purpose only
router.post("/profile", passport.authenticate("jwt", { session: false }), profile)

//  POST 
//@ Private
//@ desc api/post/addcover
// For adding the cover photo
router.post("/profile/add_cover_pic", passport.authenticate("jwt", { session: false }), addCoverPhoto)

//  POST 
//@ Private
//@ desc api/post/Profilepic
// For adding the profile photo
router.post("/profile/add_profile_pic", passport.authenticate("jwt", { session: false }), addProfilePhoto)

//  POST 
//@ Private
//@ desc api/post/Profilepic
// For adding the profile photo
router.post("/profile/add_additional_info", passport.authenticate("jwt", { session: false }), addAdditionalInfo)

module.exports = router
