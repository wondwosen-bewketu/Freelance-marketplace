const jwt = require('jsonwebtoken');
const config = require('../config');
const Freelancer = require('../models/freelancer');



exports.getFreelancerById = async (req, res) => {
  try {
   
    const freelancer = await Freelancer.findById(req.params.id);
    res.status(200).json(freelancer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getFreelancerProfile = async (req, res) => {
  try {
    const decoded = req.user;
    const freelancer = await Freelancer.findById(decoded.id);
    if (!freelancer) {
      return res.status(404).json({ msg: 'Freelancer not found' });
    }
    res.json(freelancer);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const decoded = req.user;
    const freelancer = await Freelancer.findById(decoded.id);
    if (!freelancer) {
      return res.status(404).json({ msg: 'Freelancer not found' });
    }

    const { name,username,  email,skills,hourlyRate,experience,professionalTitle , country, city } = req.body;
    freelancer.name = name;
    freelancer.username = username;
    freelancer.email = email;
    freelancer.skills = skills;
    freelancer.hourlyRate = hourlyRate;
    freelancer.experience = experience;
    freelancer.professionalTitle = professionalTitle;
    freelancer.country = country;
    freelancer.city = city;

    await freelancer.save();
    res.status(200).json({ msg: 'Profile updated successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};


exports.browseAllFreelancers = async (req, res) => {
  try {
    const freelancers = await Freelancer.find();
    res.json(freelancers);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// DELETE /api/freelancers/:id
exports.deleteFreelancer = async (req, res) => {
  const freelancerId = req.params.id;
  try {
    const freelancer = await Freelancer.findById(freelancerId);
    if (!freelancer) {
      return res.status(404).json({ error: 'Freelancer not found' });
    }
    await Freelancer.findByIdAndDelete(freelancerId);

    res.json({ message: 'Freelancer deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};



