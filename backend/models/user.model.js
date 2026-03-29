import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    // Unique username for login/identification
    username: {
      type: String,
      required: true, // Username is required for user accounts
      unique: true, // Prevents duplicate usernames in database
      trim: true, // Removes extra whitespace
      minlength: 6, // Enforces minimum length for better security/usability
    },
    // User email address
    email: {
      type: String,
      required: true, // Email is required
      unique: true, // Prevents duplicate emails in database
      lowercase: true, // Converts email to lowercase for consistency
      trim: true,
    },
    // Hashed password for authentication
    password: {
      type: String,
      required: true,
      minlength: 8, // Enforces stronger passwords
    },
    // Optional phone number
    phone: {
      type: String,
      required: false,
      trim: true,
    },
    // User role for access control
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user", // Default role for new users
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  },
);
// Create and export User model
const User = mongoose.model("User", userSchema);

export default User;
