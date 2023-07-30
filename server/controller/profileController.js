const Employer = require('../models/employer');
const Freelancer = require('../models/freelancer');


exports.getProfile = async (req, res) => {
  try {
    const { id, userType } = req.user; // Extract the user ID and userType from the authenticated request object

    // Fetch the user's information based on the userType and ID
    let user;
    if (userType === 'Freelancer') {
      user = await Freelancer.findById(id);
    } else if (userType === 'Employer') {
      user = await Employer.findById(id);
    }

    // Return an error message if the user is not found
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Return the user's information as a response
    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: 'Unauthorized' });
  }
};