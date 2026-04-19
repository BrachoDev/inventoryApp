// ProtectedRoute.jsx
// Higher-order component used to protect routes that require authentication.
// Redirects unauthenticated users to the login page.

import { Navigate } from "react-router-dom";
import { useAuthStore } from "@/store/auth";

const ProtectedRoute = ({ children }) => {
  // Get authentication token from Zustand store
  const { token } = useAuthStore();

  // If no token exists, user is not authenticated
  // Redirect to login page
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // If token exists, allow access to the protected component
  return children;
};

export default ProtectedRoute;
