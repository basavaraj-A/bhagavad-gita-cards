const express = require("express");
const router = express.Router();
const Quote = require("../models/quote.model");

// 👇 public route — fetch quotes by philosopher name
router.get("/", async (req, res) => {
  try {
    const { philosopher } = req.query;

    const filter = philosopher
      ? { philosopher: { $regex: new RegExp(philosopher, "i") } }
      : {};

    const quotes = await Quote.find(filter).sort({ createdAt: -1 });
    res.json(quotes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;