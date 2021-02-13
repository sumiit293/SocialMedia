const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mongoosastic = require("mongoosastic");

const ProfileSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "SM_Credential",
        required: true
    },
    name: {
        type: String
    },
    email: {
        type: String
    },
    profilePic: {
        type: String
    },
    coverPic: {
        type: String
    },
    bio: {
        type: String
    },
    address: {
        type: String
    },
    school: {
        type: String
    },
    college: {
        type: String
    },
    posts: [{
        type: Schema.Types.ObjectId,
        ref: 'Post',
        required: false
    }]
})

ProfileSchema.plugin(mongoosastic, {
    "host": "127.0.0.1",
    "port": "9200"
})

module.exports = Profile = mongoose.model("SM_Profile", ProfileSchema);