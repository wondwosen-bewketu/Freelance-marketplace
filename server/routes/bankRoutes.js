// routes/bankRoutes.js

const express = require('express');
const router = express.Router();
const auth = require('../auth');
const bankController = require('../controller/bankController');


router.post('/createBankAccount', bankController.createBank);

// Deposit to Bank Account
router.post('/bank/deposit', bankController.depositToBank);


router.get('/banks', bankController.getAllBanks);

// View the  balance
router.get('/bank/balance/:accountNumber', bankController.depositToBank);




module.exports = router;
