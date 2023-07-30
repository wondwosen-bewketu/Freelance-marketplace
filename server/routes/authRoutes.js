const express = require('express');
const authController = require('../controller/authController');
const router = express.Router();
const auth = require('../auth');
// In your server.js or app.js file
const profileController = require('../controller/profileController');


// Define the route for the profile API
router.get('/profile', auth, profileController.getProfile);
// Route for user login
router.post('/login', authController.login);
// Route for testing the authentication middleware
router.get('/test', auth, (req, res) => {
  res.json(req.user);
});

module.exports = router;
