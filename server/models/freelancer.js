const mongoose = require('mongoose');

const freelancerSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    // unique: true,
  },
  email: {
    type: String,
    required: true,
    // unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  gender: {
    type: String,
    required: false,
  },
  skills: {
    type: [String],
    required: false,
  },
  hourlyRate: {
    type: String,
    required: false,
  },
  experience: {
    type: String,
    required: false,
  },
  professionalTitle: {
    type: String,
    required: false,
  },
  phone: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  verificationToken: {
    type: String,
    required: false,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
 
  profileImage: {
    type: String, // Assuming you store the file name/path in the database
    required: true,
  },
});

const Freelancer = mongoose.model('Freelancer', freelancerSchema);

module.exports = Freelancer;
