const jwt = require('jsonwebtoken');
const config = require('../config');
const Employer = require('../models/employer');
const Freelancer = require('../models/freelancer');
const bcrypt = require('bcrypt');

exports.login = async (req, res) => {
  const { email, password, userType } = req.body;

  // Check if user exists in the correct schema based on userType
  let user;
  if (userType === 'Freelancer') {
    user = await Freelancer.findOne({ email });
  } else if (userType === 'Employer') {
    user = await Employer.findOne({ email });
  }

  // If user doesn't exist or password doesn't match, return an error
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(400).json({ message: 'Invalid email or password' });
  }

  // Check if the user's email is verified
  if (!user.isVerified) {
    return res.status(401).json({ message: 'Please verify your email before logging in' });
  }

  // Create and sign a JWT token
  const token = jwt.sign({ user: { id: user._id, userType } }, config.secret);

  // Send the token as response
 // ...

// Send the token and user object as response
res.json({ token, user });

};
