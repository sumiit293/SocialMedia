const mongoose = require("mongoose")
const Schema = mongoose.Schema

const PostSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "SM_Credential"
    },
    profile: {
        type: Schema.Types.ObjectId,
        ref: "SM_Profile"
    },
    title: {
        type: String
    },
    content: {
        type: String
    },
    images: {
        type: [String]
    },
    likes: {
        type: [Schema.Types.ObjectId]
    },
    comment: {
        type: [Schema.Types.ObjectId],
        ref: "SM_Comment"
    }
})
module.exports = mongoose.model("SM_Post", PostSchema)