const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema({
  name: String,
  roll: String,
  score: Number,
  percentage: String,
  correct: Number,
  wrong: Number,
  unanswered: Number,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Result", resultSchema);