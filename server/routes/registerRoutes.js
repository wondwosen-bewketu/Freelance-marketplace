const express = require('express');
const router = express.Router();
const employerController = require('../controller/registerController');

router.post('/signup', employerController.register);

module.exports = router;
