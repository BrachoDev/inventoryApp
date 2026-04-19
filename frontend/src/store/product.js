// product.js
// Zustand store for managing product state and product-related API actions.
// Handles creating, retrieving, updating, and deleting inventory products.

import { create } from "zustand";

export const useProductStore = create((set) => ({
  // Global list of products displayed throughout the app
  products: [],

  // Manually replace the current product list in state
  setProduct: (products) => set({ products }),

  // ====================
  // CREATE PRODUCT
  // ====================
  // Sends a new product to the backend and adds it to local state
  // so the UI updates immediately without a page refresh.
  createProduct: async (newProduct) => {
    // Validate required fields before making the request
    if (
      !newProduct.name ||
      !newProduct.price ||
      !newProduct.image ||
      !newProduct.binLocation ||
      !newProduct.quantity
    ) {
      return { success: false, message: "Please fill in all required fields" };
    }

    const res = await fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    });

    const data = await res.json();

    // Return backend validation or server error message
    if (!data.success) {
      return { success: false, message: data.message };
    }

    // Add the newly created product to state immediately
    set((state) => ({ products: [...state.products, data.data] }));

    return { success: true, message: "Product created successfully" };
  },

  // ====================
  // FETCH PRODUCTS
  // ====================
  // Retrieves all products from the backend and stores them in global state.
  fetchProducts: async () => {
    const res = await fetch("/api/products");
    const data = await res.json();

    set({ products: data.data });
  },

  // ====================
  // DELETE PRODUCT
  // ====================
  // Deletes a product by ID and removes it from local state
  // so the UI reflects the change immediately.
  deleteProduct: async (pid) => {
    const res = await fetch(`/api/products/${pid}`, {
      method: "DELETE",
    });

    const data = await res.json();

    if (!data.success) {
      return { success: false, message: data.message };
    }

    // Remove deleted product from state without needing another fetch
    set((state) => ({
      products: state.products.filter((product) => product._id !== pid),
    }));

    return { success: true, message: data.message };
  },

  // ====================
  // UPDATE PRODUCT
  // ====================
  // Sends updated product data to the backend and replaces the old product
  // in local state so the UI stays in sync.
  updateProduct: async (pid, updatedData) => {
    const res = await fetch(`/api/products/${pid}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    });

    const data = await res.json();

    if (!data.success) {
      return { success: false, message: data.message };
    }

    // Replace the updated product in state immediately
    set((state) => ({
      products: state.products.map((product) =>
        product._id === pid ? data.data : product,
      ),
    }));

    return { success: true, message: "Product updated successfully" };
  },
}));
