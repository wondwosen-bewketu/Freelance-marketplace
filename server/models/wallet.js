const mongoose = require("mongoose");

const walletSchema = new mongoose.Schema({
  payer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employer"
  },
  payee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Freelancer"
  },
  accountNumber: {
    type: Number,
    required: true
  },
  balance: {
    type: Number,
    required: true,
    default: 0
  },
  totalAdminFee: {
    type: Number,
    required: true,
    default: 0
  }
});

const Wallet = mongoose.model("Wallet", walletSchema);

module.exports = Wallet;
