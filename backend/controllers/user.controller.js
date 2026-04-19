// user.controller.js
// Handles all user-related backend operations such as
// registration, login, retrieval, update, and deletion.

import User from "../models/user.model.js";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// ====================
// REGISTER USER
// ====================
// Creates a new user account after validating input,
// checking for duplicates, and hashing the password.
export const registerUser = async (req, res) => {
  const user = req.body; // Data sent from the client

  // Validate required fields
  if (!user.username || !user.email || !user.password) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }

  // Validate email format to ensure a proper email address is provided
  const emailRegex = /^[^\s@]+@([^\s@]+\.)+[^\s@]+$/;
  if (!emailRegex.test(user.email)) {
    return res.status(400).json({
      success: false,
      message: "Please provide a valid email address",
    });
  }

  // Validate phone number only if the user provided one
  if (user.phone) {
    // Accepts multiple phone number styles such as:
    // +1234567890, 1234567890, (123) 456-7890, etc.
    const phoneRegex =
      /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,6}[-\s\.]?[0-9]{1,6}$/;

    if (!phoneRegex.test(user.phone)) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid phone number",
      });
    }

    // Store phone number in a normalized format by removing symbols/spaces
    user.phone = user.phone.replace(/\D/g, "");
  }

  // Require a minimum password length for better security
  if (user.password.length < 8) {
    return res.status(400).json({
      success: false,
      message: "Password must be at least 8 characters long",
    });
  }

  // Require a minimum username length
  if (user.username.length < 6) {
    return res.status(400).json({
      success: false,
      message: "Username must be at least 6 characters long",
    });
  }

  // Restrict username characters to keep usernames clean and predictable
  const usernameRegex = /^[a-zA-Z0-9_]+$/;
  if (!usernameRegex.test(user.username)) {
    return res.status(400).json({
      success: false,
      message: "Username can only contain letters, numbers, and underscores",
    });
  }

  // Enforce stronger passwords by requiring:
  // at least one uppercase letter, one lowercase letter, and one number
  const passwordStrengthRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/;
  if (!passwordStrengthRegex.test(user.password)) {
    return res.status(400).json({
      success: false,
      message:
        "Password must contain at least one uppercase letter, one lowercase letter, and one number",
    });
  }

  // Check whether the username or email is already being used
  const existingUser = await User.findOne({
    $or: [{ username: user.username }, { email: user.email }],
  });

  if (existingUser) {
    // Return a specific message depending on which field is duplicated
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

  // Hash password before saving so plain-text passwords are never stored
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(user.password, salt);

  // Build the new user document
  const newUser = new User({
    username: user.username,
    email: user.email,
    password: hashedPassword,
    phone: user.phone || null, // Store null when phone is not provided
  });

  try {
    // Save the user to the database
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

// ====================
// GET ALL USERS
// ====================
// Retrieves all users from the database while excluding passwords
// so sensitive information is not exposed in the response.
export const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");

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

// ====================
// DELETE USER
// ====================
// Deletes a user by ID after validating that the ID
// is a valid MongoDB ObjectId.
export const deleteUser = async (req, res) => {
  const { id } = req.params;

  // Prevent invalid IDs from being used in database queries
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

// ====================
// UPDATE USER
// ====================
// Updates user information based on the provided ID.
export const updateUser = async (req, res) => {
  const { id } = req.params;
  const user = req.body;

  // Validate MongoDB ObjectId before attempting update
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: "Invalid User ID" });
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(id, user, {
      new: true, // Return the updated document instead of the original
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

// ====================
// LOGIN USER
// ====================
// Authenticates a user by verifying credentials and
// returning a signed JWT token for future protected requests.
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  // Validate required login fields
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  try {
    // Allow login using either email or username in the same field
    const user = await User.findOne({
      $or: [{ email }, { username: email }],
    });

    // Return a generic error message to avoid exposing which field failed
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Compare entered password with hashed password stored in database
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Generate JWT token used for authenticating protected routes
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    console.error("Error logging in user:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// ====================
// GET CURRENT USER
// ====================
// Verifies the JWT token sent in the request header and
// returns the currently logged-in user's information.
export const getCurrentUser = async (req, res) => {
  try {
    // Extract token from Authorization header: "Bearer <token>"
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "No token provided",
      });
    }

    // Decode and verify the token using the server's secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Retrieve user data without returning the password field
    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User retrieved successfully",
      user,
    });
  } catch (error) {
    // Token is missing, expired, or invalid
    res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }
};
