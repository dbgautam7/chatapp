const Messages=require("../models/Messages")

const PostMessages = async (req, res) => {
  try {
    const data = await Messages.create(req.body);
    if(data){
    res.status(200).json({ message:data,
      message: 'Message created successfully.' });
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
    const messages = await Messages.find({
      members: { $all: [userId, conversationId] }
    });

    // console.log(messages,"**")
    res.json({
      messagesList: messages
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to retrieve messages' });
  }
};


  exports.PostMessages=PostMessages;
  exports.GetMessagesById=GetMessagesById;