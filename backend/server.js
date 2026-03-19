import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import Product from "./models/product.model.js";

dotenv.config();

const app = express();

app.post("/api/products", async (req, res) => {
  const product = req.body; // user will send this data

  if (
    !product.name ||
    !product.price ||
    !product.quantity ||
    !product.image ||
    !product.binLocation
  ) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all required fields" });
  }

  const newProduct = new Product(product);

  try {
    await newProduct.save();
    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    console.error("Error in Create product:", error.message);
    res.status(500).json({ success: false, message: "Error creating product" });
  }
});

app.listen(5000, () => {
  connectDB();
  console.log("Server is running at http://localhost:5000");
});
