const express = require("express");
const {
  fetchAllShlokas,
  fetchSingleShloka,
} = require("../controllers/shloka.controller");

const router = express.Router();

// GET /api/shlokas
router.get("/", fetchAllShlokas);

// GET /api/shlokas/:chapter/:verse
router.get("/:chapter/:verse", fetchSingleShloka);

module.exports = router;
