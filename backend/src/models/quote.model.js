const mongoose = require("mongoose");

const quoteSchema = new mongoose.Schema(
  {
    philosopher: {
      type: String,
      required: true,
      trim: true,
    },
    quote: {
      type: String,
      required: true,
      trim: true,
    },
    translations: {
      english: { type: String, default: "" },
      hinglish: { type: String, default: "" },
    },
    category: {
      type: String,
      default: "wisdom",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Quote", quoteSchema); 