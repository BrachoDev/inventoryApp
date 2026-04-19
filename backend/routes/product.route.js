// product.route.js
// Defines API routes for product-related operations.
// Each route maps an HTTP request to a controller function.

import express from "express";

// Import controller functions that handle the business logic
import {
  createProduct,
  deleteProduct,
  getProducts,
  updateProduct,
} from "../controllers/product.controller.js";

// Create a new Express router instance
const router = express.Router();

// ====================
// PRODUCT ROUTES
// ====================

// GET /api/products
// Retrieve all products from the database
router.get("/", getProducts);

// POST /api/products
// Create a new product
router.post("/", createProduct);

// DELETE /api/products/:id
// Delete a product by its unique ID
router.delete("/:id", deleteProduct);

// PUT /api/products/:id
// Update an existing product by ID
router.put("/:id", updateProduct);

// Export router to be used in server.js
export default router;