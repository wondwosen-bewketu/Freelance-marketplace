const Wallet = require("../models/wallet");
const Bank = require('../models/bank');

// create bank account for freelancer
exports.createWalletForFreelancer = async (req, res, next) => {
  try {
    const { accountNumber } = req.body;
    const existingWallet = await Wallet.findOne({ payee: req.params.id });
    if (existingWallet) {
      return res.status(400).json({
        message: 'A Wallet already exists for this freelancer'
      });
    }
    const bank = await Bank.findOne({ accountNumber });
    if (!bank) {
      return res.status(400).json({
        message: 'Bank not found'
      });
    }
    const wallet = new Wallet({
      payee: req.params.id,
      accountNumber: bank.accountNumber,
      balance: 0
    });
    const result = await wallet.save();
    res.status(201).json({
      message: 'Wallet for freelancer created successfully',
      wallet: result
    });
  } catch (error) {
    next(error);
  }
}



// get the freelancer balance
exports.getFreelancerBalance = async (req, res, next) => {
  try {
    const wallet = await Wallet.findOne({ payee: req.params.id });
    if (!wallet) {
      return res.status(404).json({
        message: 'Bank account not found for this freelancer'
      });
    }
    res.status(200).json({
      balance: wallet.balance
    });
  } catch (error) {
    next(error);
  }
};

exports.withdrawFromWallet = async (req, res, next) => {
  try {
    const { amount } = req.body;
    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount) || numericAmount <= 0) {
      return res.status(400).json({
        message: 'Invalid amount'
      });
    }
    
    const wallet = await Wallet.findOne({ payee: req.params.id });
    if (!wallet) {
      return res.status(404).json({
        message: 'Wallet for freelancer not found'
      });
    }
    
    if (wallet.balance < numericAmount) {
      return res.status(400).json({
        message: 'Insufficient balance in the wallet'
      });
    }
    
    const bank = await Bank.findOne({ accountNumber: wallet.accountNumber });
    if (!bank) {
      return res.status(404).json({
        message: 'Bank not found'
      });
    }
    
    bank.balance += numericAmount;
    wallet.balance -= numericAmount;
    
    const result = await Promise.all([bank.save(), wallet.save()]);
    
    res.status(200).json({
      message: 'Withdrawal from bank account successful',
      wallet: result[1]
    });
  } catch (error) {
    next(error);
  }
}




