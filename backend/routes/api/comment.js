const router = require("express").Router();
const passport = require("passport");
const { addReplyToComment, getAllRepliesForComment, deleteReply } = require("./../../controllers/comment");


// @POST
// PRIVATE ROUTE
// Desc api/comment/reply-comment
router.post("/comment/reply-comment", passport.authenticate("jwt", { session: false }), addReplyToComment);

// @GET
// PRIVATE ROUTE
// Desc api/reply/:id
router.get("/reply/:id", passport.authenticate("jwt", { session: false }), getAllRepliesForComment);

// @GET
// PRIVATE ROUTE
// Desc api/reply/:id
router.post("/comment/delete-reply", passport.authenticate("jwt", { session: false }), deleteReply);

module.exports = router