const mongoose = require("mongoose");

const referralSchema = new mongoose.Schema(
  {
    referrer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    referredUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    referralCode: {
      type: String,
      required: true,
    },
    rewardEarned: {
      type: Number,
      default: 0, // Tracks reward earned for the referral
    },
    isRewardClaimed: {
      type: Boolean,
      default: false, // Indicates if the reward has been claimed
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Referral", referralSchema);
