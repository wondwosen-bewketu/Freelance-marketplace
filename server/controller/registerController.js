const Employer = require('../models/employer');
const Freelancer = require('../models/freelancer');
const validator = require('validator');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const multer = require('multer');
const path = require('path');

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads'); // Specify the destination folder where the uploaded files will be stored
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const fileExtension = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + fileExtension); // Set the file name to be unique
  }
});

// File upload middleware
const upload = multer({ storage });

// Function to send verification email
const sendVerificationEmail = async (email, token) => {
  try {
    // Create a verification link with the generated token
    const verificationLink = `http://localhost:4000/verify-email?token=${token}`;

    // Create a transport object for sending emails (using Gmail SMTP)
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'wendibewketu@gmail.com',
        pass: 'qjzmkjsihynwzppq',
      },
    });

    // Prepare the email content
    const mailOptions = {
      from: 'wendibewketu@gmail.com',
      to: email,
      subject: 'Email Verification',
      html: `<p>Please click the following link to verify your email: <a href="${verificationLink}">${verificationLink}</a></p>`,
    };

    // Send the verification email
    await transporter.sendMail(mailOptions);

    console.log('Verification email sent successfully');
  } catch (error) {
    console.error('Failed to send verification email. Error:', error);
    throw new Error('Failed to send verification email. Please try again later.');
  }
};

exports.register = [
  upload.single('profileImage'), // Specify the field name used for the profile image file
  async (req, res) => {
    try {
      const {
        fullName,
        username,
        email,
        password,
        dateOfBirth,
        gender,
        phone,
        country,
        city,
        userType,
      } = req.body;

      // Check if the email is valid
      if (!validator.isEmail(email)) {
        throw new Error('Invalid email format');
      }

      // Check if the password is strong enough
      if (!validator.isStrongPassword(password)) {
        throw new Error('Password is not strong enough');
      }

      // Generate a salt and hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Generate a verification token
      const token = crypto.randomBytes(20).toString('hex');

      // Create a new object with the user data
      const user = {
        fullName,
        username,
        email,
        password: hashedPassword,
        dateOfBirth,
        gender,
        phone,
        country,
        city,
        verificationToken: token, // Add the verification token to the user object
        userType,
      };

      // Add the profile image file name/path if it exists
      if (req.file) {
        user.profileImage = req.file.filename;
      }

      // Check the user type and save the data to the corresponding schema
      if (userType === 'Freelancer') {
        const freelancer = new Freelancer(user);
        await freelancer.save();
      } else if (userType === 'Employer') {
        const employer = new Employer(user);
        await employer.save();
      }

      await sendVerificationEmail(email, token); // Send the verification email

      // Send a success response
      res.send('Registration successful! Please check your email for verification.');
    } catch (error) {
      console.error('Registration failed. Error:', error);
      res.status(500).json({ error: error.message });
    }
  },
];
