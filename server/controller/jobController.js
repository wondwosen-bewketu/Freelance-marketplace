const Job = require('../models/Job');
const Employer = require('../models/employer');

exports.createJob = async (req, res) => {
  const {
    fullName,
    jobTitle,
    jobDescription,
    jobCategory,
    translation,
    graphics,
    jobType,
    jobLevel,
    jobLocation,
    salary,
    jobStartDate,
    jobEndDate
  } = req.body;
  
  const employerId = req.user.id;

  try {
    const employer = await Employer.findById(employerId);

    if (!employer) {
      return res.status(404).json({ message: 'Employer not found' });
    }
    

    const job = new Job({
      employer,
      fullName,
      jobTitle,
      jobDescription,
      jobCategory,
      translation,
      graphics,
      jobType,
      jobLevel,
      jobLocation,
      salary,
      jobStartDate,
      jobEndDate
    });

    await job.save();

    res.status(201).json(job);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};


exports.getJobsByEmployerId = async (req, res) => {
  try {
    const jobs = await Job.find({ employer: req.params.employerId });
    res.json(jobs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}


exports.getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find();
    res.json(jobs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};





exports.deleteJob = async (req, res) => {
  
  try {
    const deletedJob = await Job.findByIdAndDelete( req.params.jobId);
    if (!deletedJob) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.json({ message: 'Job deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};


