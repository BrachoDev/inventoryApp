import express from "express";
// import controllers functions
import {
  createProduct,
  deleteProduct,
  getProducts,
  updateProduct,
} from "../controllers/product.controller.js";

const router = express.Router();

router.get("/", getProducts); // Retrieves all products from the database
router.post("/", createProduct); // Creates a new product
router.delete("/:id", deleteProduct); // Deletes a product by ID
router.put("/:id", updateProduct); // Updates a product by ID

export default router;
