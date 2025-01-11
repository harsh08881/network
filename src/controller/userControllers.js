const User = require("../models/user");
const generateUsernames = require('../services/userName')
const { generateWallet } = require("../services/wallet");
const jwt = require('jsonwebtoken');

const generateUserName = (req, res) => {
    const { name, mobileNumber } = req.body;
  
    // Input validation
    if (!name || !mobileNumber || mobileNumber.length < 7) {
      return res.status(400).json({
        error: "Please provide a valid name and a mobile number with at least 7 digits.",
      });
    }
  
    try {
      // Generate usernames
      const usernames = generateUsernames(name, mobileNumber);
      res.status(200).json({ usernames });
    } catch (err) {
      res.status(500).json({ error: "An error occurred while generating usernames." });
    }
  };


const registerUser = async (req, res) => {
  try {
    const { username, mobileNumber, email, password, firstName, lastName } = req.body;
    console.log(req.body);

    // Check for duplicate email or mobile number
    const existingUser = await User.findOne({
      $or: [{ email: email.toLowerCase() }, { mobileNumber }],
    });
    if (existingUser) {
      return res.status(400).json({ error: "Email or mobile number already in use." });
    }

    // Create a new user
    const newUser = new User({
      username,
      mobileNumber,
      email: email.toLowerCase(),
      password,
      firstName,
      lastName,
    });

    // Save the user to the database
    await newUser.save();
     // Generate a wallet for the new user
    await generateWallet(newUser._id);

    // Send a success response
    res.status(201).json({
      message: "User registered successfully.",
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        mobileNumber: newUser.mobileNumber,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
      },
    });
  } catch (error) {
    console.error("Error during user registration:", error);
    res.status(500).json({ error: "An error occurred while registering the user." });
  }
};

const loginUser = async (req, res) => {
    try {
      const { email, password } = req.body;
      console.log(req.body);
  
      // Check if user exists
      const user = await User.findOne({ email }).select("+password");
      if (!user) {
        return res.status(404).json({ error: "User not found. Please register first." });
      }
  
      // Compare passwords
      const isPasswordValid = await user.comparePassword(password);
      if (!isPasswordValid) {
        return res.status(401).json({ error: "Invalid email or password." });
      }

      console.log(user);
  
      // Generate JWT token without expiration
      const token = jwt.sign(
        { id: user._id, email: user.email },
        process.env.JWT_SECRET || "your_jwt_secret_key"
      );
  
      // Send success response
      res.status(200).json({
        message: "Login successful.",
        token,
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          mobileNumber: user.mobileNumber,
          firstName: user.firstName,
          lastName: user.lastName,
        },
      });
    } catch (error) {
      console.error("Error during user login:", error);
      res.status(500).json({ error: "An error occurred while logging in." });
    }
  };
  
  const getProfileDetails = async (req, res) => {
    try {
      const userId = req.user.id; // Assumes authentication middleware is used to get the logged-in user ID
  
      // Fetch user details by user ID
      const user = await User.findById(userId).select("-password"); // Exclude password from response
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      return res.status(200).json(user);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Server Error" });
    }
  };

  module.exports = {
    generateUserName,
    registerUser,
    loginUser,
    getProfileDetails
  };