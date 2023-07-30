const express = require('express');
const router = express.Router();
const auth = require('../auth');
const feedbackController = require('../controller/feedBackController');

// Create new feedback
router.post('/feedback', feedbackController.createFeedback);
// Get all feedback
router.get('/feedbacks', feedbackController.getAllFeedback);

router.delete('/feedbacks/delete/:id', auth,feedbackController.deleteFeedback);

module.exports = router;
