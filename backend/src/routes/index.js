const express = require("express");
const shlokaRoutes = require("./shloka.routes");

const router = express.Router();

// Shloka routes
router.use("/shlokas", shlokaRoutes);

module.exports = router;
