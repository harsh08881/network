const mongoose = require("mongoose");

const rewardSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
      required: true,
      unique: true, // Each user should have one active reward record
    },
    rewardStartTime: {
      type: Date,
      required: true,
      default: Date.now, // When the reward system is activated
    },
    rewardAmount: {
      type: Number,
      default: 0, // Default reward amount
    },
    isRewardActive: {
      type: Boolean,
      default: true, // Reward mechanism is active by default when triggered
    },
    lastUpdated: {
      type: Date,
      default: Date.now, // Last updated timestamp
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt timestamps
  }
);

module.exports = mongoose.model("Reward", rewardSchema);
