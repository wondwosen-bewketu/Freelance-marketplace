const path = require('path');
const multer = require('multer');
const Job = require('../models/Job');
const Application = require('../models/application');



// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads'); // Specify the destination folder where the uploaded files will be stored
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const fileExtension = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + fileExtension); // Set the file name to be unique
  }
});

const upload = multer({ storage });

// Create a new application
exports.createApplication = [
  upload.single('resume'), // Specify the field name used for the resume file
  async (req, res) => {
    const { name, email } = req.body;
    const jobId = req.params.jobId;
    const employerId = req.user.id;

    try {
      const job = await Job.findById(jobId);

      if (!job) {
        return res.status(404).json({ message: 'Job not found' });
      }
      const existingApplication = await Application.findOne({
        jobId,
        email,
      });

      if (existingApplication) {
        return res.status(400).json({ message: 'You have already applied for this job' });
      }

      const application = new Application({
        jobId,
        employerId,
        name,
        email,
        resume: req.file.filename // Save the uploaded file name in the 'resume' field
      });

      await application.save();
      res.status(201).json(application);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  }
];

exports.getApplicationsByJobId = async (req, res) => {
  const jobId = req.params.jobId; // assuming the job id is in the URL parameter
  
  try {
    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    const applications = await Application.find({ jobId });

    res.status(200).json(applications);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};


// Get all applicants for a job
exports.getAllApplicants = async (req, res) => {
    try {
      const application = await Application.find();
      res.json(application);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  };

  // Delete an application by ID
exports.deleteApplication = async (req, res) => {
  const applicationId = req.params.id;

  try {
    const application = await Application.findById(applicationId);

    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    await Application.findByIdAndDelete(applicationId);

    res.status(200).json({ message: 'Application deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};


  