// auth.js
// Zustand store for managing authentication state.
// Handles login, logout, user persistence, and account creation.

import { create } from "zustand";

export const useAuthStore = create((set) => ({
  // Stores the currently authenticated user
  user: null,

  // Initialize token from localStorage so auth persists across page refreshes
  token: localStorage.getItem("token") || null,

  // Manually update user state
  setUser: (user) => set({ user }),

  // ====================
  // LOGIN
  // ====================
  // Sends login credentials to the backend, stores the returned
  // user and token, and saves the token in localStorage.
  login: async (credentials) => {
    // Validate required fields before making request
    if (!credentials.email || !credentials.password) {
      return { success: false, message: "Please fill in all fields" };
    }

    const res = await fetch("/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    const data = await res.json();

    // Return backend error message if login fails
    if (!data.success) {
      return { success: false, message: data.message };
    }

    // Save authenticated user and token in global state
    set({
      user: data.user,
      token: data.token,
    });

    // Persist token so user remains logged in after refresh
    localStorage.setItem("token", data.token);

    return { success: true, message: "Login successful" };
  },

  // ====================
  // LOGOUT
  // ====================
  // Clears authentication data from both localStorage and Zustand state.
  logout: () => {
    localStorage.removeItem("token");
    set({ user: null, token: null });
  },

  // ====================
  // CHECK AUTH
  // ====================
  // Verifies whether a saved token is still valid by requesting
  // the current user from the backend.
  checkAuth: async () => {
    const token = localStorage.getItem("token");

    // Stop early if no saved token exists
    if (!token) return;

    try {
      const res = await fetch("/api/users/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (data.success) {
        // Restore authenticated user in state if token is valid
        set({ user: data.user, token });
      } else {
        // Remove invalid/expired token and reset auth state
        localStorage.removeItem("token");
        set({ user: null, token: null });
      }
    } catch (error) {
      // Network or server error during token validation
      console.log("Auth check failed");
    }
  },

  // ====================
  // CREATE USER
  // ====================
  // Sends registration data to the backend to create a new account.
  createUser: async (userData) => {
    // Validate required fields before sending request
    if (!userData.username || !userData.email || !userData.password) {
      return { success: false, message: "Please fill in all fields" };
    }

    const res = await fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const data = await res.json();
    return data;
  },
}));