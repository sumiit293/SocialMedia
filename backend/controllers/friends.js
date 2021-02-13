const FriendList = require("./../models/FriendList");
const MessageSchema = require("./../models/Message");

exports.addToFriendList = async (req, res) => {

    try {
        var MyFriendList = await FriendList.findOne({ user: req.user.id });
        var MyFriendFriendList = await FriendList.findOne({ user: req.body.friend_id });
        var newMessgeBox = new MessageSchema({ user: req.user.id, to: req.body.friend_id });
        newMessgeBox = await newMessgeBox.save();

        if (!MyFriendList) {
            MyFriendList = new FriendList({ user: req.user.id });
            await MyFriendList.save();
        }
        if (!MyFriendFriendList) {
            MyFriendFriendList = new FriendList({ user: req.body.friend_id });
            await MyFriendFriendList.save();
        }
        await FriendList.findOneAndUpdate({ user: req.user.id }, {
            $push: {
                friendList: [{
                    friend_id: req.body.friend_id,
                    message_id: newMessgeBox._id
                }]
            }
        })
        await FriendList.findOneAndUpdate({ user: req.body.friend_id }, {
            $push: {
                friendList: [{
                    friend_id: req.user.id,
                    message_id: newMessgeBox._id
                }]
            }
        })
        return res.send("Added to friend list successfully");
    } catch (error) {
        console.log(error);
        res.status(500).send("Could not add as friends");
    }


}

exports.getListOfFriends = async (req, res) => {
    try {
        // Getting list of friends 
        const Friends = await FriendList.findOne({ user: req.user.id });
        if (!Friends) {
            const newFriendSchema = new FriendList({
                user: req.user.id
            });
            await newFriendSchema.save();
            return res.json({ friends: newlyCreatedFriendSchema });
        }
        return res.json({ friends: Friends });

    } catch (error) {
        console.log(error);
    }

};

