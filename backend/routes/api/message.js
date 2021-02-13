const router = require("express").Router();
const passport = require("passport");
const { addMessageToDb, fetchMessage } = require("./../../controllers/message");

//@ POST
//@ Private 
//@ DESC pushing the message to msg collection
router.post("/message/add", passport.authenticate("jwt", { session: false }), addMessageToDb)
module.exports = router;

//@ GET 
//@ PRIVATE
//@ DESC getting the messages
router.get("/messages/:id", passport.authenticate("jwt", { session: false }), fetchMessage)
