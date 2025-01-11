const Reward = require('../models/reward');

const startReward = async (req, res) => {
    try {
      const userId = req.body.userId; // Assume `userId` is sent in the request body
  
      // Check if the user already has an active reward
      let reward = await Reward.findOne({ user: userId });
      if (reward && reward.isRewardActive) {
        return res
          .status(400)
          .json({ message: "Reward mechanism is already active for this user." });
      }
  
      // If no reward record exists, create a new one
      if (!reward) {
        reward = new Reward({ user: userId });
      }
  
      // Activate reward and set the start time
      reward.rewardStartTime = new Date();
      reward.isRewardActive = true;
      reward.rewardAmount = 0; // Start with 0 reward
      await reward.save();
  
      // Schedule reward deactivation and periodic calculation
      const startTime = Date.now();
      const endTime = startTime + 24 * 60 * 60 * 1000; // 24 hours from now
  
      return res.status(200).json({
        message: "Reward mechanism activated for 24 hours.",
        rewardStartTime: reward.rewardStartTime,
      });
    } catch (error) {
      console.error("Error starting reward:", error);
      return res.status(500).json({ message: "An error occurred while starting the reward." });
    }
  };