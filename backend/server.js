// Import dependencies
import express from "express";
import dotenv from "dotenv";
import path from "path";

// Import database connection function
import { connectDB } from "./config/db.js";

// Import route handlers
import productRoutes from "./routes/product.route.js";
import userRoutes from "./routes/user.route.js";

// Load environment variables from .env file
dotenv.config();

// NOTE: Uncomment these lines to debug environment variables if needed
// console.log("MongoDB URI:", process.env.MONGO_URI);
// console.log("PORT:", process.env.PORT);

// Initialize Express app
const app = express();

// Set the port from environment variable or default to 5000
const PORT = process.env.PORT || 5000;

// Get the current directory path using path.resolve() for compatibility with ES modules
const __dirname = path.resolve(); // Get the current directory path

app.use(express.json()); //allows us to parse JSON bodies in requests

// Use the imported route handlers for products and users
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);

// Serve static files from the frontend in production
if (process.env.NODE_ENV === "production") {
  // Serve static files from the React frontend build directory
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  // For any route that doesn't match the API routes, serve the React frontend's index.html
  app.get("/{*splat}", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

// NOTE: Uncomment this route to test if the server is running correctly
// app.get("/", (req, res) => {
//   res.send("API is running...");
// });

// Start the server and connect to the database
app.listen(PORT, () => {
  connectDB();
  console.log("Server is running on port http://localhost:" + PORT);
});
