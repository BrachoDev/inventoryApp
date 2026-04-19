// product.model.js
// Defines the schema and structure for Product documents
// stored in MongoDB. Enforces validation rules such as
// required fields and uniqueness constraints.

import mongoose from "mongoose";

// Schema representing an inventory product
const productSchema = new mongoose.Schema(
  {
    // Unique product name used for identification
    name: {
      type: String,
      required: true,
      unique: true, // Prevent duplicate product names
      trim: true, // Clean up extra whitespace
    },

    // Monetary value of the product
    price: {
      type: Number,
      required: true,
    },

    // Image URL used for displaying the product in the UI
    image: {
      type: String,
      required: true,
    },

    // Storage location (e.g., warehouse bin)
    // Must be unique so no two products share the same space
    binLocation: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    // Number of items available in stock
    quantity: {
      type: Number,
      required: true,
    },
  },
  {
    // Automatically adds:
    // createdAt → when the product was created
    // updatedAt → last time the product was modified
    timestamps: true,
  }
);

// Create and export the Product model
// This model is used to interact with the "products" collection in MongoDB
const Product = mongoose.model("Product", productSchema);

export default Product;