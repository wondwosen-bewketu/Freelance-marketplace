const express = require("express");
const router = express.Router();
const auth = require('../auth');
const employerAccountController = require("../controller/employerWallet");
const freelancerAccountController = require("../controller/freelancerWallet");





router.post('/bank/employer/:id', auth, employerAccountController.createWalletForEmployer);

router.post('/bank/employer/:id/deposit', auth, employerAccountController.depositToWallet);

router.get('/bank/employer/:id/balance', auth,employerAccountController.getEmployerBalance);

// Send money from employer to freelancer
router.post('/bank/send-funds/:id', auth, employerAccountController.sendMoney);





router.post('/bank/freelancer/:id', auth, freelancerAccountController.createWalletForFreelancer);


router.get('/bank/freelancer/:id/balance', auth,freelancerAccountController.getFreelancerBalance);


router.post('/bank/freelancer/:id/withdraw', auth, freelancerAccountController.withdrawFromWallet);


module.exports = router;
