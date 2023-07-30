const Employer = require('../models/employer');
const Freelancer = require('../models/freelancer');

exports.verifyEmail = async (request, response) => {
  try {
    const { token } = request.query;
    console.log('Received token:', token);

    // Find the employer or freelancer with the matching verification token
    const employer = await Employer.findOne({ verificationToken: token }).exec();
    const freelancer = await Freelancer.findOne({ verificationToken: token }).exec();

    console.log('Employer:', employer);
    console.log('Freelancer:', freelancer);

    // Check if a valid employer or freelancer is found
    if (!employer && !freelancer) {
      throw new Error('Invalid verification token');
    }

    // Perform the necessary actions based on the user type (employer or freelancer)
    if (employer) {
      // Perform actions for employer verification (e.g., update the verification status)
      employer.verificationToken = null; // Clear the verification token
      employer.isVerified = true; // Update the verification status
      await employer.save();

      // Redirect the user to the front-end home page
      return response.redirect('http://localhost:3000/login');
    } else if (freelancer) {
      // Perform actions for freelancer verification (e.g., update the verification status)
      freelancer.verificationToken = null; // Clear the verification token
      freelancer.isVerified = true; // Update the verification status
      await freelancer.save();

      // Redirect the user to the front-end home page
      return response.redirect('http://localhost:3000/login');
    }
  } catch (error) {
    console.error('Email verification failed. Error:', error);
    response.status(500).json({ error: 'Email verification failed. Please try again.' });
  }
};
