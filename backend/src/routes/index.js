const express = require("express");
const shlokaRoutes = require("./shloka.routes");
const adminRoutes = require("./admin.routes");
const quoteRoutes = require("./quote.routes");

const router = express.Router();

// Shloka routes
router.use("/shlokas", shlokaRoutes);
//Admin routes
router.use("/admin", adminRoutes);
router.use("/quotes", quoteRoutes);

module.exports = router;
