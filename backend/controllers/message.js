const Message = require("./../models/Message");

exports.addMessageToDb = async (req, res) => {
    const { msg_id, msg, mine } = req.body;
    //getting the message collection
    const currMessageCollection = await Message.findByIdAndUpdate(msg_id,
        { $push: { msgs: { mine: mine, msg: msg, timeStamp: Date.now() } } }
    );
    return res.json(currMessageCollection);
}

exports.fetchMessage = async (req, res) => {
    const currMessageCollection = await Message.findById(req.params.id);
    return res.json(currMessageCollection);
}

