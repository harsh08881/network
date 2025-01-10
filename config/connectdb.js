const mongoose = require("mongoose");

const connectToMongoDB = async () => {
  const uri = process.env.MONGO_URI;

  if (!uri) {
    console.error("MongoDB URI is not defined in the environment variables.");
    process.exit(1); // Exit if no URI is found
  }

  try {
    await mongoose.connect(uri, {
      dbName: "network", // Optional: Specify your database name
    });
    console.log("Connected to MongoDB!");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // Exit the process on failure
  }
};

module.exports = connectToMongoDB;