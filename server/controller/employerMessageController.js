// controllers/messageController.js
const Message = require("../models/message");


exports.sendMessageByEmployer = async (req, res) => {
  const { content } = req.body;
  try {
    const newMessage = new Message({
      sender: req.params.id,
      receiver: req.params.receiverId, // Extract receiver ID from req.params
      content,
    });
    const savedMessage = await newMessage.save();
    const message = await Message.findById(savedMessage._id)
      .populate("sender", "firstName")
      .populate("receiver", "firstName");
    res.status(201).json(message);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.getMessagesByReceiver = async (req, res) => {
  try {
    const messages = await Message.find({
      receiver: req.params.freelancerId,
    }).populate("sender", "fullName email ").populate("receiver","fullName email");

    res.status(200).json({ messages });
   
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

