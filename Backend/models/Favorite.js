const mongoose = require("mongoose");

const FavoriteSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  countryCode: {
    type: String,
    required: true,
  },
  countryName: {
    type: String,
    required: true,
  },
  flagUrl: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create a compound index to prevent duplicate favorites for the same user
FavoriteSchema.index({ user: 1, countryCode: 1 }, { unique: true });

module.exports = mongoose.model("Favorite", FavoriteSchema);
