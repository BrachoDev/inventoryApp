// user.model.js
// Defines the schema for User documents in MongoDB.
// Includes validation rules, unique constraints, and
// role-based access control for authentication.

import mongoose from "mongoose";

// Schema representing an application user
const userSchema = new mongoose.Schema(
  {
    // Unique username used for login and identification
    username: {
      type: String,
      required: true,
      unique: true, // Prevent duplicate usernames
      trim: true, // Remove unnecessary whitespace
      minlength: 6, // Enforce minimum length for usability/security
    },

    // User email used for authentication and communication
    email: {
      type: String,
      required: true,
      unique: true, // Prevent duplicate emails
      lowercase: true, // Normalize emails for consistent comparisons
      trim: true,
    },

    // Stores hashed password (never plain text)
    password: {
      type: String,
      required: true,
      minlength: 8, // Basic password strength requirement
    },

    // Optional phone number (normalized in controller before saving)
    phone: {
      type: String,
      required: false,
      trim: true,
    },

    // Role used for authorization (future scalability for admin features)
    role: {
      type: String,
      enum: ["admin", "user"], // Restrict allowed values
      default: "user", // All new users start as regular users
    },
  },
  {
    // Automatically adds:
    // createdAt → when the user was created
    // updatedAt → last profile update
    timestamps: true,
  }
);

// Create and export the User model
// This model interacts with the "users" collection in MongoDB
const User = mongoose.model("User", userSchema);

export default User;