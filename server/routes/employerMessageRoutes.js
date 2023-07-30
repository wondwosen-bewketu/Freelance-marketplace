// routes/messageRoutes.js
const express = require("express");
const router = express.Router();
const messageController = require("../controller/employerMessageController");


router.post("/sendmessage/:id/:receiverId", messageController.sendMessageByEmployer);
// Get messages between employer and freelancer
router.get('/messages/:freelancerId', messageController.getMessagesByReceiver);




module.exports = router;
