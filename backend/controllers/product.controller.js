// product.controller.js
// Handles all product-related operations including
// retrieving, creating, updating, and deleting inventory items.

import Product from "../models/product.model.js";
import mongoose from "mongoose";

// ====================
// GET ALL PRODUCTS
// ====================
// Retrieves all products from the database and returns them to the client
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    // Log error for debugging
    console.error("Error fetching products:", error.message);

    // Return generic server error to client
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ====================
// CREATE PRODUCT
// ====================
// Creates a new product after validating required fields
// and ensuring no duplicate name or bin location exists
export const createProduct = async (req, res) => {
  const product = req.body;

  // Validate required fields before proceeding
  if (
    !product.name ||
    !product.price ||
    !product.image ||
    !product.binLocation ||
    !product.quantity
  ) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  try {
    // Check if a product with the same name already exists
    const existingName = await Product.findOne({ name: product.name });

    // Check if a bin location is already occupied
    const existingBin = await Product.findOne({
      binLocation: product.binLocation,
    });

    // If both name and bin are taken, return combined error
    if (existingName && existingBin) {
      return res.status(400).json({
        success: false,
        message: "Product name and bin location are already in use",
      });
    }

    // If only name exists
    if (existingName) {
      return res.status(400).json({
        success: false,
        message: "A product with this name already exists",
      });
    }

    // If only bin is taken
    if (existingBin) {
      return res.status(400).json({
        success: false,
        message: "This bin location is already occupied",
      });
    }

    // Create and save the new product
    const newProduct = new Product(product);
    await newProduct.save();

    // Return success response with created product
    res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: newProduct,
    });
  } catch (error) {
    console.error("Error creating product:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ====================
// DELETE PRODUCT
// ====================
// Deletes a product by its ID after validating the ID format
export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  // Validate MongoDB ObjectId format before querying database
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({
      success: false,
      message: "Invalid Product ID",
    });
  }

  try {
    // Remove product from database
    await Product.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting product:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ====================
// UPDATE PRODUCT
// ====================
// Updates a product by ID while ensuring no duplicate
// name or bin location (excluding the current product)
export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const product = req.body;

  // Validate MongoDB ObjectId format
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({
      success: false,
      message: "Invalid Product ID",
    });
  }

  try {
    // Check if another product (not this one) has the same name
    const existingName = await Product.findOne({
      name: product.name,
      _id: { $ne: id }, // Exclude current product
    });

    // Check if another product (not this one) uses the same bin location
    const existingBin = await Product.findOne({
      binLocation: product.binLocation,
      _id: { $ne: id }, // Exclude current product
    });

    // If both conflicts exist
    if (existingName && existingBin) {
      return res.status(400).json({
        success: false,
        message: "Product name and bin location are already in use",
      });
    }

    // If only name conflict exists
    if (existingName) {
      return res.status(400).json({
        success: false,
        message: "A product with this name already exists",
      });
    }

    // If only bin conflict exists
    if (existingBin) {
      return res.status(400).json({
        success: false,
        message: "This bin location is already occupied",
      });
    }

    // Perform the update and return the updated document
    const updatedProduct = await Product.findByIdAndUpdate(id, product, {
      new: true, // Return updated document instead of old one
    });

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: updatedProduct,
    });
  } catch (error) {
    console.error("Error updating product:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
