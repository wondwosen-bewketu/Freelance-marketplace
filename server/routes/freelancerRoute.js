const express = require('express');
const router = express.Router();
const auth = require('../auth');
const freelancerController = require('../controller/freelancerController');


// Get employer by id for FreelancerProfile
router.get('/freelancers/:id', auth, freelancerController.getFreelancerById);
// Get employer by id for FreelancerPage
router.get('/freelancer/:id', auth, freelancerController.getFreelancerById);
// POST update profile
router.put('/editfreelancerprofile', auth, freelancerController.updateProfile);
// GET edit profile page
router.get('/viewfreelancerprofile', auth, freelancerController.getFreelancerProfile);
// Browse all freelancer
router.get('/freelancers', auth, freelancerController.browseAllFreelancers);

// DELETE /api/freelancers/:id
router.delete('/freelancers/delete/:id', auth,freelancerController.deleteFreelancer);


module.exports = router;
