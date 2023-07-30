const mongoose = require('mongoose');
const Employer = require('../models/employer');

const jobSchema = new mongoose.Schema({
  employer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employer',
    required: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  jobTitle: {
    type: String,
    required: true
  },
  jobDescription: {
    type: String,
    required: true
  },
 
  jobCategory: {
    type: String,
   
  },
  translation: {
    type: String
  },
  graphics: {
    type: String
  },
  jobType: {
    type: String,
    required: true
  },
  jobLevel: {
    type: String,
    required: true
  },
  jobLocation: {
    type: String,
    required: true
  },
  salary: {
    type: Number,
    required: true
  },
  jobStartDate: {
    type: Date,
    required: true
  },
  jobEndDate: {
    type: Date,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now  // Set the default value to the current timestamp when the job is created
  }
});

module.exports = mongoose.model('Job', jobSchema);
