// controllers/messageController.js
const Message = require("../models/message");


exports.createMessage = async (req, res) => {
    const { content } = req.body;
    try {
      const newMessage = new Message({
        sender: req.params.id,
        receiver: req.params.receiverId, // Extract receiver ID from req.params
        content,
      });
      const savedMessage = await newMessage.save();
      const message = await Message.findById(savedMessage._id)
        .populate("sender", "fullName")
        .populate("receiver", "fullName");
      res.status(201).json(message);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Server Error" });
    }
  };

exports.getMessagesByEmployer = async (req, res) => {
    try {
        const messages = await Message.find({
          sender: req.params.employerId,
        }).populate("sender", "fullName email ").populate("receiver","fullName email");
        
        res.status(200).json({ messages });
       
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" });
      }
    };