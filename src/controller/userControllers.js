const User = require("../models/user");
const generateUsernames = require('../services/userName')

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

    // Input validation
    if (!username || !mobileNumber || !email || !password || !firstName || !lastName) {
      return res.status(400).json({ error: "All fields are required." });
    }

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
  
      // Validate input
      if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required." });
      }
  
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
  


  module.exports = {
    generateUserName,
    registerUser,
    loginUser
  };