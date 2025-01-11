const mongoose = require("mongoose");

const referralTokenSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    token: {
      type: String,
      unique: true,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    expiresAt: {
      type: Date, // Optional: To handle token expiration
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ReferralToken", referralTokenSchema);
