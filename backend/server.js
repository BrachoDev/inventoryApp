import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";

import productRoutes from "./routes/product.route.js";

dotenv.config();

// NOTE: Use this to check if the environment variable is being loaded correctly
// console.log("MongoDB URI:", process.env.MONGO_URI);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json()); //allows us to parse JSON bodies in requests

app.use("/api/products", productRoutes);

app.listen(PORT, () => {
  connectDB();
  console.log("Server is running on port http://localhost:" + PORT);
});
