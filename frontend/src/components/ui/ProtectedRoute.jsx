import { Navigate } from "react-router-dom";
import { useAuthStore } from "@/store/auth";

const ProtectedRoute = ({ children }) => {
  const { token } = useAuthStore();

  // ❌ Not logged in → go to login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // ✅ Logged in → allow access
  return children;
};

export default ProtectedRoute;
