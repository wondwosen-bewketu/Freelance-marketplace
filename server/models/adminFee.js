const mongoose = require("mongoose");

const adminFeeSchema = new mongoose.Schema({
  totalAdminFee: {
    type: Number,
    required: true,
    default: 0
  }
});

const AdminFee = mongoose.model("AdminFee", adminFeeSchema);

module.exports = AdminFee;
