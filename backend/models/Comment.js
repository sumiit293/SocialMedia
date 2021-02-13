const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "SM_Credential",
        required: true
    },
    profile: {
        type: Schema.Types.ObjectId,
        ref: "SM_Profile"
    },
    comment: {
        type: String
    },
    replies: [{
        name: {
            type: Schema.Types.ObjectId,
            ref: "SM_Profile",
            required: true
        },
        value: {
            type: String,
            required: true
        }
    }]
})
module.exports = mongoose.model("SM_Comment", CommentSchema);