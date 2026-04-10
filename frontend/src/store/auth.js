import { create } from "zustand";

export const useAuthStore = create((set) => ({
  user: null,
  token: localStorage.getItem("token") || null,

  setUser: (user) => set({ user }),

  login: async (credentials) => {
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

    if (!data.success) {
      return { success: false, message: data.message };
    }

    // STORE BOTH user + token
    set({
      user: data.user,
      token: data.token,
    });

    localStorage.setItem("token", data.token);

    return { success: true, message: "Login successful" };
  },

  logout: () => {
    localStorage.removeItem("token");
    set({ user: null, token: null }); // also clear token
  },

  checkAuth: async () => {
    const token = localStorage.getItem("token");

    if (!token) return;

    try {
      const res = await fetch("/api/users/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (data.success) {
        set({ user: data.user, token }); // keep token in state
      } else {
        localStorage.removeItem("token");
        set({ user: null, token: null });
      }
    } catch (error) {
      console.log("Auth check failed");
    }
  },

  createUser: async (userData) => {
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