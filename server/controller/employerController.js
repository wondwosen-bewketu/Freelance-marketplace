const jwt = require('jsonwebtoken');
const config = require('../config');
const Employer = require('../models/employer');
const Message = require('../models/message');

exports.sendMessage = async (req, res) => {
  try {
    const { senderId, receiverId, message } = req.body;

    // Check if the sender and receiver ids are valid and exist in the database
    // ...

    const newMessage = new Message({ senderId, receiverId, message });
    await newMessage.save();

    res.status(201).json({ success: true, message: 'Message sent successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error sending message' });
  }
};



exports.getEmployerById = async (req, res) => {
  try {
   
    const employer = await Employer.findById(req.params.id);
    res.status(200).json(employer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getEmployerProfile = async (req, res) => {
  try {
    const decoded = req.user;
    const employer = await Employer.findById(decoded.id);
    if (!employer) {
      return res.status(404).json({ msg: 'Employer not found' });
    }
    res.json(employer);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const decoded = req.user;
    const employer = await Employer.findById(decoded.id);
    if (!employer) {
      return res.status(404).json({ msg: 'Employer not found' });
    }

    const { fullName, email, username,company,website,country, city } = req.body;
    employer.fullName = fullName;
    employer.username = username;
    employer.email = email;
    employer.company = company;
    employer.website = website;
    employer.country = country;
    employer.city = city;

    await employer.save();
    res.status(200).json({ msg: 'Profile updated successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
exports.browseAllEmployers = async (req, res) => {
  try {
    const employers = await Employer.find();
    res.json(employers);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};


// DELETE /api/employers/:id
exports.deleteEmployer = async (req, res) => {
  const employerId = req.params.id;
  try {
    const employer = await Employer.findById(employerId);
    if (!employer) {
      return res.status(404).json({ error: 'Employer not found' });
    }
    await Employer.findByIdAndDelete(employerId);

    res.json({ message: 'Employer deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};
