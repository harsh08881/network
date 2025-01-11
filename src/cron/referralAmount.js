const cron = require("node-cron");
const Referral = require("../models/referral");
const { updateWallet } = require("../services/wallet");

const processReferralRewards = async () => {
  try {
    // Find all unclaimed referral rewards
    const unclaimedReferrals = await Referral.find({ isRewardClaimed: false });

    for (const referral of unclaimedReferrals) {
      const referrerReward = referral.rewardEarned || 10; // Default reward for referrer
      const referredUserReward = 5; // Default reward for the referred user

      // Credit reward to the referrer's wallet
      await updateWallet(referral.referrer, referrerReward, "credit", "Referral reward (Referrer)");

      // Credit reward to the referred user's wallet
      if (referral.referredUser) {
        await updateWallet(referral.referredUser, referredUserReward, "credit", "Referral reward (Referred User)");
      }

      // Mark the referral reward as claimed
      referral.isRewardClaimed = true;
      await referral.save();
    }

    console.log("Referral rewards processed successfully.");
  } catch (error) {
    console.error("Error processing referral rewards:", error);
  }
};

// Schedule the cron job to run every 5 minutes
cron.schedule("*/1 * * * *", () => {
  console.log("Running referral reward processing job...");
  processReferralRewards();
});
