const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('../config');
const Admin = require('../models/admin.js');

// Create a new admin
router.post('/admin', async (req, res) => {
  const { name,email, password } = req.body;
  try {
   
    // Create new admin
   
    const newAdmin = new Admin({
      name,
      email,
      password
    });
    await newAdmin.save();
    res.status(201).json({ message: 'Admin created successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// get all 

// Define a login endpoint
router.post('/adminlogin', async (req, res) => {
    const { email, password } = req.body;
  
    // Check if user exists in database
    const admin = await Admin.findOne({ email });
  
    if (!admin) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
  
    // Check if password is correct
    if (admin.password !== password) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
  
   // Create and sign a JWT token
   const token = jwt.sign({ admin: { id: admin._id} }, config.secret);

   // Send the token as response
  res.json({ token });
  });
  
  
  

module.exports = router;
