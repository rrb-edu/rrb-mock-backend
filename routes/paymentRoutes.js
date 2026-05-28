const express = require("express");
const Payment = require("../models/Payment");

const router = express.Router();

router.post("/save", async (req, res) => {
  try {
    const payment = new Payment(req.body);
    await payment.save();

    res.json({
      message: "Payment saved successfully"
    });

  } catch (error) {
    res.status(500).json({
      message: "Payment save error",
      error
    });
  }
});

router.get("/all", async (req, res) => {
  try {
    const payments = await Payment.find()
      .sort({ createdAt: -1 });

    res.json(payments);

  } catch (error) {
    res.status(500).json({
      message: "Payment load error",
      error
    });
  }
});

module.exports = router;