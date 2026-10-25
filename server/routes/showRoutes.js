
const express = require("express");
const mongoose = require("mongoose");
const Show = require("../models/Show");
const adminMiddleware = require("../middleware/adminMiddleware");
const router = express.Router();

// Get all shows, including movie details
router.get("/", async (req, res) => {
  try {
    const shows = await Show.find()
      .populate("movie")
      .sort({ showDate: 1, showTime: 1 });

    res.json(shows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get shows for a particular movie
router.get("/movie/:movieId", async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.movieId)) {
      return res.status(400).json({ message: "Invalid movie ID" });
    }

    const shows = await Show.find({ movie: req.params.movieId })
      .populate("movie");

    res.json(shows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add a show
router.post("/", adminMiddleware, async (req, res) => {
  try {
    const show = await Show.create(req.body);
    res.status(201).json(show);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
