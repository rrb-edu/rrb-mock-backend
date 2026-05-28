const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

/* SIGNUP */
router.post("/signup", async (req, res) => {
  try {
    const { name, roll, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if(existingUser){
      return res.status(400).json({
        message: "User already exists"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      roll,
      email,
      password: hashedPassword
    });

    await user.save();

    res.json({
      message: "Signup successful"
    });

  } catch (error) {
    res.status(500).json({
      message: "Signup error",
      error
    });
  }
});

/* LOGIN */
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    
    if(user && user.isPremium && user.premiumExpiry){

  if(new Date(user.premiumExpiry) < new Date()){

    user.isPremium = false;
    user.premiumExpiry = null;

    await user.save();

  }

}

    if(!user){
      return res.status(400).json({
        message: "User not found"
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if(!isMatch){
      return res.status(400).json({
        message: "Invalid password"
      });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      message: "Login successful",
      token,
      user
    });

  } catch (error) {
    res.status(500).json({
      message: "Login error",
      error
    });
  }
});
/* ACTIVATE PREMIUM */
router.post("/activate-premium", async (req, res) => {

  try {

    const { email } = req.body;

    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 30);

    const user = await User.findOneAndUpdate(
      { email },
      {
        isPremium: true,
        premiumExpiry: expiryDate
      },
      { new: true }
    );

    if(!user){
      return res.status(404).json({
        message: "User not found"
      });
    }

    res.json({
      message: "Premium activated successfully",
      user
    });

  } catch (error) {

    res.status(500).json({
      message: "Premium activation error",
      error
    });

  }

});
module.exports = router;