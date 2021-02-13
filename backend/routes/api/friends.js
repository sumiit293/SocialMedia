const router = require("express").Router();
const passport = require("passport");
const { addToFriendList, getListOfFriends } = require("./../../controllers/friends");

//@  POST 
//@ Private
//@ desc api/add-friend
router.post("/add-friend", passport.authenticate("jwt", { session: false }), addToFriendList);

// @ GET
// @ Private
//@ DESC to get list of friends
router.get("/friend-list", passport.authenticate("jwt", { session: false }), getListOfFriends);

module.exports = router;