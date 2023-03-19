const Messages = require("../models/Messages")

const PostMessages = async (req, res) => {
  try {
    const data = await Messages.create(req.body);
    if (data) {
      res.status(200).json({
        message: data,
        message: 'Message created successfully.'
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error creating message.' });
  }
}

const GetMessagesById = async (req, res) => {
  const userId = req.params.userId;
  const conversationId = req.params.conversationId;

  try {
    const page = parseInt(req.query.page) || 1 ;
    const limit = parseInt(req.query.limit) ;
    const messages = await Messages.find({
      members: { $all: [userId, conversationId] }
    })
      // .sort({ _id: -1 })
      // .skip((page - 1) * limit)
      // .limit(limit)
    res.json({
      messagesList: messages,
      msg: 'Fetch Success'
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to retrieve messages' });
  }
};


exports.PostMessages = PostMessages;
exports.GetMessagesById = GetMessagesById;