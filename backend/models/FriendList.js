const mongoose = require("mongoose")
const Schema = mongoose.Schema

const FriendListSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "SM_Credential",
        required: true
    },
    friendList: [{
        friend_id: {
            type: Schema.Types.ObjectId,
            ref: "SM_Credential",
            required: true
        },
        message_id: {
            type: Schema.Types.ObjectId,
            ref: "SM_Message",
            required: true
        }
    }]


})
module.exports = mongoose.model("SM_FriendList", FriendListSchema)
