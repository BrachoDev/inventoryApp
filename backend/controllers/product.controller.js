import Product from "../models/product.model.js";
import mongoose from "mongoose";

// Get all products
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.error("Error fetching products:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

//  Create a new product
export const createProduct = async (req, res) => {
  const product = req.body;

  // Validate required fields
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
    // Check if BOTH name and bin are already taken (combined message)
    const existingName = await Product.findOne({ name: product.name });
    const existingBin = await Product.findOne({
      binLocation: product.binLocation,
    });

    if (existingName && existingBin) {
      return res.status(400).json({
        success: false,
        message: "Product name and bin location are already in use",
      });
    }

    // Check if product name already exists
    if (existingName) {
      return res.status(400).json({
        success: false,
        message: "A product with this name already exists",
      });
    }

    // Check if bin is already occupied
    if (existingBin) {
      return res.status(400).json({
        success: false,
        message: "This bin location is already occupied",
      });
    }

    // Create and save new product
    const newProduct = new Product(product);
    await newProduct.save();

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

// Delete a product by ID
export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  // Validate MongoDB ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({
      success: false,
      message: "Invalid Product ID",
    });
  }

  try {
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

// Update a product by ID
export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const product = req.body;

  // Validate MongoDB ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({
      success: false,
      message: "Invalid Product ID",
    });
  }

  try {
    // Check duplicate name (excluding current product)
    const existingName = await Product.findOne({
      name: product.name,
      _id: { $ne: id },
    });

    // Check duplicate bin (excluding current product)
    const existingBin = await Product.findOne({
      binLocation: product.binLocation,
      _id: { $ne: id },
    });

    // Combined error
    if (existingName && existingBin) {
      return res.status(400).json({
        success: false,
        message: "Product name and bin location are already in use",
      });
    }

    if (existingName) {
      return res.status(400).json({
        success: false,
        message: "A product with this name already exists",
      });
    }

    if (existingBin) {
      return res.status(400).json({
        success: false,
        message: "This bin location is already occupied",
      });
    }

    // Perform update
    const updatedProduct = await Product.findByIdAndUpdate(id, product, {
      new: true,
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
