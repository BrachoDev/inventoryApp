// Import dependencies
import express from "express";
import dotenv from "dotenv";

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

app.use(express.json()); //allows us to parse JSON bodies in requests

// Use the imported route handlers for products and users
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);

// NOTE: Uncomment this route to test if the server is running correctly
// app.get("/", (req, res) => {
//   res.send("API is running...");
// });

// Start the server and connect to the database
app.listen(PORT, () => {
  connectDB();
  console.log("Server is running on port http://localhost:" + PORT);
});
