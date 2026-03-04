const Shloka = require("../models/shloka.model");

/**
 * Get all shlokas
 */
const getAllShlokas = async () => {
  return await Shloka.find().sort({ chapter: 1, verse: 1 });
};

/**
 * Get single shloka by chapter & verse
 */
const getShlokaById = async (chapter, verse) => {
  return await Shloka.findOne({ chapter, verse });
};

module.exports = {
  getAllShlokas,
  getShlokaById,
};
