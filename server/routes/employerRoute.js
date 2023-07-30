const express = require('express');
const router = express.Router();
const auth = require('../auth');
const employerController = require('../controller/employerController');

// Browse all employers
router.get('/employers', auth, employerController.browseAllEmployers);
// Get employer by id for EmployerProfile
router.get('/employers/:id', auth, employerController.getEmployerById);
// Get employer by id for EmployerPage
router.get('/employer/:id', auth, employerController.getEmployerById);
// POST update profile
router.put('/editemployerprofile', auth, employerController.updateProfile);
// GET edit profile page
router.get('/viewpemployerrofile', auth, employerController.getEmployerProfile);
// DELETE /api/employers/:id
router.delete('/employers/delete/:id', auth,employerController.deleteEmployer);

// GET all messages for an employer
router.get("/employer/message/:id", auth, async (req, res) => {
  try {
    const employer = await Employer.findById(req.params.id).populate(
      "messages.sender"
    );
    res.status(200).json(employer.messages);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});
// POST a new message for an employer
router.post("/employer/message/:id", auth, async (req, res) => {
  try {
    const employer = await Employer.findById(req.params.id);
    const sender = req.user.id;
    const content = req.body.message;
    const newMessage = new Message({ sender, content });
    employer.messages.push(newMessage);
    await employer.save();
    const populatedMessage = await newMessage.populate("sender").execPopulate();
    res.status(201).json(populatedMessage);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});
  

module.exports = router;