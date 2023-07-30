const Feedback = require('../models/feedback');

// Create new feedback
exports.createFeedback = async (req, res) => {
  try {
    const { fullName,email, message } = req.body;
    const feedback = new Feedback({ fullName,email, message });
    await feedback.save();
    res.status(201).json({ message: 'Feedback created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to create feedback' });
  }
};

// Get all feedback
exports.getAllFeedback = async (req, res) => {
  try {
    const feedbacks = await Feedback.find();
    res.status(200).json(feedbacks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to get feedbacks' });
  }
};

// DELETE /api/feedback/:id
exports.deleteFeedback = async (req, res) => {
  const feedbackId = req.params.id;
  try {
    const feedback = await Feedback.findById(feedbackId);
    if (!feedback) {
      return res.status(404).json({ error: 'feedback not found' });
    }
    await Feedback.findByIdAndDelete(feedbackId);

    res.json({ message: 'feedback deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};