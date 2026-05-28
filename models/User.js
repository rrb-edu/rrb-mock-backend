const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

  name: String,

  roll: String,

  email: String,

  password: String,

  isPremium: {
    type: Boolean,
    default: false
  },

  premiumExpiry: {
    type: Date,
    default: null
  }

});

module.exports =
  mongoose.model("User", userSchema);