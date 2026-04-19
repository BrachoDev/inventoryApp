// user.route.js
// Defines API routes for user management and authentication.
// Maps incoming requests to controller functions.

import express from "express";

import {
  registerUser,
  getUsers,
  deleteUser,
  updateUser,
  loginUser,
  getCurrentUser,
} from "../controllers/user.controller.js";

// Create a new Express router
const router = express.Router();

// ====================
// USER ROUTES
// ====================

// POST /api/users
// Register a new user account
router.post("/", registerUser);

// GET /api/users
// Retrieve all users (typically for admin or testing purposes)
router.get("/", getUsers);

// DELETE /api/users/:id
// Delete a user by ID
router.delete("/:id", deleteUser);

// PUT /api/users/:id
// Update user information by ID
router.put("/:id", updateUser);

// ====================
// AUTH ROUTES
// ====================

// POST /api/users/login
// Authenticate user and return JWT token
router.post("/login", loginUser);

// GET /api/users/me
// Retrieve the currently logged-in user using JWT token
router.get("/me", getCurrentUser);

// Export router for use in server.js
export default router;