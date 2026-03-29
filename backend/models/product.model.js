import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    // Name of the product
    name: {
      type: String,
      required: true, // Name is required
    },
    // Price of the product
    price: {
      type: Number,
      required: true, // Price is required
    },
    // URL or path to the product image
    image: {
      type: String,
      required: true, // Image is required
    },
    // Physical location of the product in the warehouse
    binLocation: {
      type: String,
      required: true, // Bin location is required
    },
    // Quantity of the product in stock
    quantity: {
      type: Number,
      required: true, // Quantity is required
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  },
);

// Create the Product model using the productSchema
const Product = mongoose.model("Product", productSchema);

export default Product;
