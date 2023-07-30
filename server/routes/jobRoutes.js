const express = require('express');
const router = express.Router();
const jobController = require('../controller/jobController');
const Job = require('../models/Job');
const auth = require('../auth');

router.post('/postJob', auth, jobController.createJob);
router.get('/jobs/:id', jobController.getJobsByEmployerId);
router.get('/browseJob/:employerId',auth,jobController.getJobsByEmployerId)
router.get('/browseJob', auth, jobController.getAllJobs);
// Delete an Job by ID
router.delete('/deletejobs/:jobId', jobController.deleteJob);



module.exports = router;
