const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// Define the schema for the user
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
      maxlength: 50,
    },
    mobileNumber: {
      type: String,
      required: true,
      unique: true,
      match: /^[0-9]{10}$/, // Ensures it’s a valid 10-digit mobile number
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Basic email validation
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false, // Prevents password from being returned in queries
    },
    firstName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50,
    },
  },
  { timestamps: true }
);

// Hash password before saving the document
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); // Skip if password is not modified
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare passwords
userSchema.methods.comparePassword = async function (inputPassword) {
  return await bcrypt.compare(inputPassword, this.password);
};

// Export the model
const User = mongoose.model("User", userSchema);

module.exports = User;
