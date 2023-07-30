// controllers/bankController.js

const Bank = require('../models/bank');
exports.createBank = async (req, res, next) => {
  try {
    const { name, balance } = req.body;
    const lastBank = await Bank.findOne().sort({ accountNumber: -1 });
    let accountNumber = 1000; // Default starting account number

    if (lastBank) {
      accountNumber = lastBank.accountNumber + 1;
    }

    const newBank = new Bank({
      name,
      accountNumber,
      balance,
    });

    const result = await newBank.save();

    res.status(201).json({ message: 'Bank account created', bank: result });
  } catch (error) {
    next(error);
  }
};

exports.getAllBanks = async (req, res, next) => {
  try {
    const banks = await Bank.find();
    res.status(200).json({ banks });
  } catch (error) {
    next(error);
  }
};




exports.depositToBank = async (req, res, next) => {
    try {
      const { accountNumber, amount } = req.body;
      const bankAccount = await Bank.findOne({ accountNumber });
      if (!bankAccount) {
        return res.status(404).json({
          message: 'Bank account not found for this account number'
        });
      }
      const balance = Number(bankAccount.balance) + Number(amount); // convert balance and amount to numbers before adding
      bankAccount.balance = balance;
      const result = await bankAccount.save();
      res.status(200).json({
        message: 'Deposit successful',
        bankAccount: result
      });
    } catch (error) {
      next(error);
    }
  };
  
  exports.getBalance = async (req, res, next) => {
    try {
      const { accountNumber } = req.params;
  
      const bankAccount = await BankAccount.findOne({ accountNumber });
  
      if (!bankAccount) {
        return res.status(404).json({
          message: 'Bank account not found',
        });
      }
  
      res.status(200).json({
        balance: bankAccount.balance,
      });
    } catch (error) {
      next(error);
    }
  };
  