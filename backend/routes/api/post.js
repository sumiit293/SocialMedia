const router = require("express").Router();
const passport = require("passport");
const { post, deletePost, getAllPost, addCommentToPost, getCommentsForPost, likeOrUnlikePost, deleteComment } = require("./../../controllers/post");

//  POST 
//@ Private
//@ desc api/post
router.post("/post", passport.authenticate("jwt", { session: false }), post)

//  DELETE 
//@ Private
//@ desc api/post
router.delete("/post/:id", passport.authenticate("jwt", { session: false }), deletePost);

//GET
//@ PRIVATE
//@  desc api/post
router.get("/post", passport.authenticate("jwt", { session: false }), getAllPost);

//GET
//@ PRIVATE
//@  desc api/post/comments/:id
router.get("/post/comments/:id", passport.authenticate("jwt", { session: false }), getCommentsForPost);

//POST
//@ PRIVATE
//@ desc api/post/comment
router.post("/post/comment", passport.authenticate("jwt", { session: false }), addCommentToPost);

//POST
//@ PRIVATE
//@ desc api/post/comment
router.post("/post/like", passport.authenticate("jwt", { session: false }), likeOrUnlikePost);

//DELETE
//@ PRIVATE
//@ desc api/comment/:post_id/:comment_id
router.post("/comment/delete", passport.authenticate("jwt", { session: false }), deleteComment);

module.exports = router
