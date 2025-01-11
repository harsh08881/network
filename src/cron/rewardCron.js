const cron = require("node-cron");
const Reward = require("../models/reward"); // Import Reward model
const Wallet = require("../models/wallet"); // Import Wallet model

// Helper function to calculate reward
const calculateReward = (seconds) => 0.05 * seconds;

// Reward calculation cron job
const startRewardCron = () => {
  cron.schedule("*/5 * * * * *", async () => {
    try {
      const now = Date.now();

      // Find all active rewards
      const activeRewards = await Reward.find({ isRewardActive: true });

      for (const reward of activeRewards) {
        const endTime = new Date(reward.rewardStartTime).getTime() + 24 * 60 * 60 * 1000; // Calculate reward end time

        // If reward period has ended, deactivate the reward
        if (now >= endTime) {
          reward.isRewardActive = false;
          await reward.save();
          console.log(`Reward deactivated for user ${reward.user}`);
          continue;
        }

        // Calculate and update reward
        const elapsedSeconds = Math.floor((now - reward.lastUpdated) / 1000);
        if (elapsedSeconds > 0) {
          const rewardAmount = calculateReward(elapsedSeconds);
          reward.rewardAmount += rewardAmount;
          reward.lastUpdated = new Date();
          await reward.save();
          console.log(`Reward updated for user ${reward.user}: ${rewardAmount}`);
        }
      }
    } catch (error) {
      console.error("Error in reward cron job:", error);
    }
  });

  console.log("Reward cron job started.");
};

module.exports = startRewardCron;
