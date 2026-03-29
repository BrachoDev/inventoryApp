import User from "../models/user.model.js";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

// Controller functions for user management
// Register a new user
export const registerUser = async (req, res) => {
  const user = req.body; // user will send this data

  // Check if all fields are present
  if (!user.username || !user.email || !user.password) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }

  // Email format validation
  const emailRegex = /^[^\s@]+@([^\s@]+\.)+[^\s@]+$/;
  if (!emailRegex.test(user.email)) {
    return res.status(400).json({
      success: false,
      message: "Please provide a valid email address",
    });
  }

  // Phone number validation (if provided)
  if (user.phone) {
    // Phone number regex for international format (optional)
    // This regex accepts: +1234567890, 1234567890, (123) 456-7890, etc.
    const phoneRegex =
      /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,6}[-\s\.]?[0-9]{1,6}$/;

    if (!phoneRegex.test(user.phone)) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid phone number",
      });
    }

    // Remove non-digit characters for consistent storage
    user.phone = user.phone.replace(/\D/g, "");
  }

  // Check if password length is at least 8 characters
  if (user.password.length < 8) {
    return res.status(400).json({
      success: false,
      message: "Password must be at least 8 characters long",
    });
  }

  // username min length validation
  if (user.username.length < 6) {
    return res.status(400).json({
      success: false,
      message: "Username must be at least 6 characters long",
    });
  }

  //Username allowed characters validation
  const usernameRegex = /^[a-zA-Z0-9_]+$/;
  if (!usernameRegex.test(user.username)) {
    return res.status(400).json({
      success: false,
      message: "Username can only contain letters, numbers, and underscores",
    });
  }

  // Password strength validation
  const passwordStrengthRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/;
  if (!passwordStrengthRegex.test(user.password)) {
    return res.status(400).json({
      success: false,
      message:
        "Password must contain at least one uppercase letter, one lowercase letter, and one number",
    });
  }

  // check if user already exists
  const existingUser = await User.findOne({
    $or: [{ username: user.username }, { email: user.email }],
  });
  if (existingUser) {
    // Determine which field caused the conflict
    if (existingUser.email === user.email) {
      return res
        .status(400)
        .json({ success: false, message: "Email already in use" });
    }
    if (existingUser.username === user.username) {
      return res
        .status(400)
        .json({ success: false, message: "Username already taken" });
    }
  }

  // hash the password before saving
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(user.password, salt);

  // Create a new user instance
  const newUser = new User({
    username: user.username,
    email: user.email,
    password: hashedPassword,
    phone: user.phone || null, // Set to null if phone is not provided
  });

  // Save the new user to the database
  try {
    await newUser.save();
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: newUser,
    });
  } catch (error) {
    console.error("Error registering user:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Get all users
export const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password"); // Exclude password field
    res.status(200).json({
      success: true,
      message: "Users retrieved successfully",
      data: users,
    });
  } catch (error) {
    console.error("Error retrieving users:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Delete a user by ID
export const deleteUser = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: "Invalid User ID" });
  }

  try {
    await User.findByIdAndDelete(id);
    res
      .status(200)
      .json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Update a user by ID
export const updateUser = async (req, res) => {
  const { id } = req.params;
  const user = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: "Invalid User ID" });
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(id, user, {
      new: true,
    });
    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    console.error("Error updating user:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
