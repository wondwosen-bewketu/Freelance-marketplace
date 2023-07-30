const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');


const registerRoutes = require('./routes/registerRoutes');
const authRoutes = require('./routes/authRoutes');
const employerRoutes = require('./routes/employerRoute');
const freelancerRoutes = require('./routes/freelancerRoute');
const jobRoutes = require('./routes/jobRoutes');
const applicationRoute = require('./routes/applicationRoute');
const feedbackRoutes = require('./routes/feedbackRoutes');
const adminRoutes = require('./routes/adminRoutes');
const employerMessageRoutes = require('./routes/employerMessageRoutes')
const notFoundHandler = require('./middlewares/notFoundHandler');
const freelanceMessageRoutes = require("./routes/freelanceMessageRoutes");
const freelanceBankRoute = require("./routes/walletRoutes");
const bankRoutes = require('./routes/bankRoutes');
const verifyEmailController = require('./controller/verifyEmailController');







mongoose.connect('mongodb://0.0.0.0:27017/mydb')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.use(express.json());
app.use(express.static(path.join(__dirname, 'uploads')));
app.use(express.urlencoded({ extended: true }));
app.use(cors());


app.use('/api', registerRoutes);

app.use('/api/auth',authRoutes);

app.use('/api',jobRoutes);

app.use('/api',applicationRoute);

app.use('/api',feedbackRoutes);

app.use('/api',adminRoutes);

app.use('/api',employerMessageRoutes)

app.use("/api", freelanceMessageRoutes);
// // middleware for employer routes
app.use('/api', employerRoutes);

// // middleware for freelancer routes
app.use('/api', freelancerRoutes);

app.use('/api',freelanceBankRoute)

app.use('/api', bankRoutes);

// Verify Email route
app.get('/verify-email', verifyEmailController.verifyEmail);



// app.use(notFoundHandler);



app.listen(4000, () => console.log("server is up and running on port 4000"));
 