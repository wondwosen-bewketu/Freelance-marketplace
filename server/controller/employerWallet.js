const Wallet = require("../models/wallet");
const Bank = require('../models/bank');

// create wallet for employer
exports.createWalletForEmployer = async (req, res, next) => {
  try {
    const { accountNumber } = req.body;
    const existingWallet = await Wallet.findOne({ payer: req.params.id });
    if (existingWallet) {
      return res.status(400).json({
        message: 'A Wallet already exists for this employer',
        error: 'WalletExistsError'
      });
    }
    const bank = await Bank.findOne({ accountNumber });
    if (!bank) {
      return res.status(400).json({
        message: 'Bank not found'
      });
    }
    const wallet = new Wallet({
      payer: req.params.id,
      accountNumber: bank.accountNumber,
      balance: 0
    });
    const result = await wallet.save();
    res.status(201).json({
      message: 'Wallet for employer created successfully',
      wallet: result
    });
  } catch (error) {
    next(error);
  }
};

exports.depositToWallet = async (req, res, next) => {
  try {
    const { amount } = req.body;
    const wallet = await Wallet.findOne({ payer: req.params.id });
    if (!wallet) {
      return res.status(404).json({
        message: 'Wallet not found for this employer. Please create a wallet first.',
      });
    }
    const bank = await Bank.findOne({ accountNumber: wallet.accountNumber });
    if (!bank) {
      return res.status(404).json({
        message: 'Bank not found',
      });
    }
    if (Number(amount) > Number(bank.balance)) {
      return res.status(400).json({
        message: 'Insufficient funds in wallet',
      });
    }
    const newBalance = Number(bank.balance) - Number(amount);
    bank.balance = newBalance;
    const updatedBank = await bank.save();
    const employerBalance = Number(wallet.balance) + Number(amount);
    wallet.balance = employerBalance;
    const result = await wallet.save();
    res.status(200).json({
      message: 'Deposit successful',
      wallet: result,
    });
  } catch (error) {
    next(error);
  }
};





// get the employer balance
exports.getEmployerBalance = async (req, res, next) => {
  try {
    const wallet = await Wallet.findOne({ payer: req.params.id });
    if (!wallet) {
      return res.status(404).json({
        message: 'Bank account not found for this employer'
      });
    }
    res.status(200).json({
      balance: wallet.balance
    });
  } catch (error) {
    next(error);
  }
};

// employer sends money to freelancer
exports.sendMoney = async (req, res, next) => {
  try {
    const { amount, accountNumber } = req.body;
    const payerWallet = await Wallet.findOne({ payer: req.params.id });
    const payeeWallet = await Wallet.findOne({ accountNumber: accountNumber });

    if (!payerWallet || !payeeWallet) {
      return res.status(400).json({
        message: 'Either the employer or the freelancer does not have a bank account'
      });
    }

    const numericAmount = parseFloat(amount);

    if (isNaN(numericAmount) || numericAmount <= 0) {
      return res.status(400).json({
        message: 'Invalid amount'
      });
    }

    if (payerWallet.balance < numericAmount) {
      return res.status(400).json({
        message: 'Insufficient funds'
      });
    }

    const updatedPayerBalance = payerWallet.balance - numericAmount;
    const updatedPayeeBalance = payeeWallet.balance + numericAmount;

    payerWallet.balance = updatedPayerBalance;
    payeeWallet.balance = updatedPayeeBalance;

    const result = await Promise.all([payerWallet.save(), payeeWallet.save()]);

    res.status(200).json({
      message: 'Money sent successfully',
      payerWallet: result[0],
      payeeWallet: result[1]
    });
  } catch (error) {
    next(error);
  }
};

