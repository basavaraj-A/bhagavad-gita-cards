const {
  getAllShlokas,
  getShlokaById,
} = require("../services/shloka.service");

/**
 * GET /api/shlokas
 */
const fetchAllShlokas = async (req, res, next) => {
  try {
    const shlokas = await getAllShlokas();
    res.status(200).json(shlokas);
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/shlokas/:chapter/:verse
 */
const fetchSingleShloka = async (req, res, next) => {
  try {
    const { chapter, verse } = req.params;

    const shloka = await getShlokaById(
      Number(chapter),
      Number(verse)
    );

    if (!shloka) {
      return res.status(404).json({
        message: "Shloka not found",
      });
    }

    res.status(200).json(shloka);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  fetchAllShlokas,
  fetchSingleShloka,
};
