const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "SM_Credential"
    },
    to: {
        type: Schema.Types.ObjectId,
        ref: "SM_Credential"
    },
    msgs: [{
        msg: {
            type: String,
            required: true
        },
        mine: {
            type: Boolean
        },
        timeStamp: {
            type: Date,
            default: Date.now
        }
    }]
})

module.exports = mongoose.model("SM_Message", MessageSchema);