require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const app = express();

app.use(cors());
app.use(express.json());
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);
const resultRoutes = require("./routes/resultRoutes");
app.use("/api/results", resultRoutes);
mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log("MongoDB Connected ✅");
})
.catch((err) => {
  console.log(err);
});

app.get("/", (req, res) => {
  res.send("RRB CBT Backend Running 🚀");
});

const PORT = process.env.PORT || 5000;
app.post("/api/payment/create-order", async (req, res) => {
  try {
    const options = {
      amount: 990,
      currency: "INR",
      receipt: "premium_receipt_" + Date.now()
    };

    const order = await razorpay.orders.create(options);

    res.json(order);

  } catch (error) {
    res.status(500).json({
      message: "Order creation failed",
      error
    });
  }
});

app.listen(PORT, () => {
  console.log("Server Running on Port " + PORT);
});