const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth.middleware");
const { registerAdmin, loginAdmin } = require("../controllers/admin.controller");
const Shloka = require("../models/shloka.model");
const Quote = require("../models/quote.model");

// ─── Auth Routes (public) ───
// router.post("/register", registerAdmin);

router.post("/login", loginAdmin);

// ─── Shloka Routes (protected) ───
router.get("/shlokas", protect, async (req, res) => {
  const shlokas = await Shloka.find().sort({ chapter: 1, verse: 1 });
  res.json(shlokas);
});

router.post("/shlokas", protect, async (req, res) => {
  try {
    const shloka = await Shloka.create(req.body);
    res.status(201).json(shloka);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put("/shlokas/:id", protect, async (req, res) => {
  try {
    const shloka = await Shloka.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(shloka);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete("/shlokas/:id", protect, async (req, res) => {
  try {
    await Shloka.findByIdAndDelete(req.params.id);
    res.json({ message: "Shloka deleted" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// ─── Quote Routes (protected) ───
router.get("/quotes", protect, async (req, res) => {
  const quotes = await Quote.find().sort({ philosopher: 1 });
  res.json(quotes);
});

router.post("/quotes", protect, async (req, res) => {
  try {
    const quote = await Quote.create(req.body);
    res.status(201).json(quote);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put("/quotes/:id", protect, async (req, res) => {
  try {
    const quote = await Quote.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(quote);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete("/quotes/:id", protect, async (req, res) => {
  try {
    await Quote.findByIdAndDelete(req.params.id);
    res.json({ message: "Quote deleted" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;