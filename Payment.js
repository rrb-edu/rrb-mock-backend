const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  name: String,
  email: String,
  amount: Number,
  paymentId: String,
  orderId: String,
  status: {
    type: String,
    default: "success"
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Payment", paymentSchema);