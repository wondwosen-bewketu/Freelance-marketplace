const express = require('express');
const router = express.Router();
const auth = require('../auth');
const applicationController = require('../controller/applicationController');

// Create a new application
router.post('/:jobId/apply', auth, applicationController.createApplication);
// Delete an application by ID
router.delete('/applications/:id',applicationController.deleteApplication);
router.get('/application/:jobId',auth,applicationController.getApplicationsByJobId)
router.get('/applications', auth, applicationController.getAllApplicants);


router.get('/:jobId/checkApplicationStatus', auth, (req, res) => {
    // Extract the job ID from the request parameters
    const { jobId } = req.params;
  
    // Check the user's application status in the database
    // Here, you can query your database to determine if the user has already applied for the given job
  
    // Example response: Assuming the user has already applied for the job
    const isApplied = true;
  
    res.json({ isApplied });
  });



module.exports = router;
