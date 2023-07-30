const express = require("express");
const router = express.Router();
const messageController = require("../controller/freelanceMessageController");



// Route to create a message
router.post("/replaymessage/:receiverId/:id", messageController.createMessage);


// Route to get messages by receiver
router.get("/displaymessages/:employerId",  messageController.getMessagesByEmployer);

module.exports = router;