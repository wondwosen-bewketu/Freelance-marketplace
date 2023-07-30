const mongoose = require('mongoose');

const employerSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
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
  company: {
    type: String,
    required: false,
  },
  website: {
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

const Employer = mongoose.model('Employer', employerSchema);

module.exports = Employer;
