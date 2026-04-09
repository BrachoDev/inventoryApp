import { create } from "zustand";

export const useAuthStore = create((set) => ({
  user: null,

  setUser: (user) => set({ user }),

  login: async (credentials) => {
    if (!credentials.email || !credentials.password) {
      return { success: false, message: "Please fill in all fields" };
    }

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    const data = await res.json();

    if (!data.success) {
      return { success: false, message: data.message };
    }

    // store user + token
    set({ user: data.user });
    localStorage.setItem("token", data.token);

    return { success: true, message: "Login successful" };
  },

  logout: () => {
    localStorage.removeItem("token");
    set({ user: null });
  },

  checkAuth: async () => {
    const token = localStorage.getItem("token");

    if (!token) return;

    try {
      const res = await fetch("/api/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (data.success) {
        set({ user: data.user });
      } else {
        localStorage.removeItem("token");
      }
    } catch (error) {
      console.log("Auth check failed");
    }
  },
}));
