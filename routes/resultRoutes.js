const express = require("express");
const Result = require("../models/Result");

const router = express.Router();

router.post("/save", async (req, res) => {
  try {
    const result = new Result(req.body);
    await result.save();

    res.json({ message: "Result saved successfully" });

  } catch (error) {
    res.status(500).json({ message: "Error saving result", error });
  }
});

router.get("/leaderboard", async (req, res) => {
  try {
    const results = await Result.find()
      .sort({ score: -1 })
      .limit(100);

    res.json(results);

  } catch (error) {
    res.status(500).json({ message: "Error loading leaderboard", error });
  }
});

/* DELETE RESULT */
router.delete("/delete/:id", async (req, res) => {

  try {

    await Result.findByIdAndDelete(req.params.id);

    res.json({
      message: "Result deleted successfully"
    });

  } catch (error) {

    res.status(500).json({
      message: "Error deleting result",
      error
    });

  }

});
module.exports = router;