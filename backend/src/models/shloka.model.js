const mongoose = require("mongoose");

const ShlokaSchema = new mongoose.Schema(
  {
    chapter: {
      type: Number,
      required: true,
    },
    verse: {
      type: Number,
      required: true,
    },
    sanskrit: {
      type: String,
      required: true,
    },
    translations: {
      hinglish: {
        type: String,
        required: true,
      },
      english: {
        type: String,
        required: true,
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Shloka", ShlokaSchema);
