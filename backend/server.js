// server.js
// Entry point of the backend application.
// Sets up Express server, connects to MongoDB,
// registers API routes, and serves frontend in production.

// ====================
// IMPORT DEPENDENCIES
// ====================
import express from "express";
import dotenv from "dotenv";
import path from "path";

// ====================
// IMPORT CUSTOM MODULES
// ====================

// Database connection function
import { connectDB } from "./config/db.js";

// Route handlers
import productRoutes from "./routes/product.route.js";
import userRoutes from "./routes/user.route.js";

// ====================
// CONFIGURATION
// ====================

// Load environment variables from .env file
dotenv.config();

// NOTE: Uncomment these lines to debug environment variables if needed
// console.log("MongoDB URI:", process.env.MONGO_URI);
// console.log("PORT:", process.env.PORT);

// Initialize Express app
const app = express();

// Use environment port or default to 5000
const PORT = process.env.PORT || 5000;

// Resolve current directory (needed for serving frontend in ES modules)
const __dirname = path.resolve();

// ====================
// MIDDLEWARE
// ====================

// Parse incoming JSON requests (req.body)
app.use(express.json());

// ====================
// API ROUTES
// ====================

// Route all product-related requests to productRoutes
// Base URL: /api/products
app.use("/api/products", productRoutes);

// Route all user/auth-related requests to userRoutes
// Base URL: /api/users
app.use("/api/users", userRoutes);

// ====================
// PRODUCTION SETUP
// ====================

// Serve frontend (React build) when in production mode
if (process.env.NODE_ENV === "production") {
  // Serve static files from frontend build folder
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  // Catch-all route: send back index.html for client-side routing
  app.get("/{*splat}", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

// ====================
// SERVER STARTUP
// ====================

// Start server and connect to database
app.listen(PORT, () => {
  // Establish MongoDB connection when server starts
  connectDB();

  console.log(`Server is running on http://localhost:${PORT}`);
});
