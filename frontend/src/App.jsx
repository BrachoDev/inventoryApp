// App.jsx
// Main application component.
// Handles routing, authentication check, layout structure,
// and renders protected/public pages.

import { Box, useColorModeValue, Flex, Text, Link } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import CreatePage from "./pages/CreatePage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import Navbar from "./components/ui/Navbar";
import ProtectedRoute from "./components/ui/ProtectedRoute";
import { useEffect } from "react";
import { useAuthStore } from "@/store/auth";
import { FaGithub } from "react-icons/fa";

function App() {
  // Access authentication check function from Zustand store
  const checkAuth = useAuthStore((state) => state.checkAuth);

  // Run authentication check when the app first loads
  // This ensures the user stays logged in across refreshes
  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <Box
      minH={"100vh"} // Full viewport height
      display={"flex"}
      flexDirection={"column"} // Enables footer to stay at bottom
      bg={useColorModeValue("gray.100", "gray.900")} // Light/Dark mode background
    >
      {/* Navigation bar displayed on all pages */}
      <Navbar />

      {/* ==================== ROUTES ==================== */}
      <Routes>
        {/* Public Route: accessible without authentication */}
        <Route path="/login" element={<LoginPage />} />

        {/* Protected Route: only accessible if user is authenticated */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />

        {/* Protected Route: create product page */}
        <Route
          path="/create"
          element={
            <ProtectedRoute>
              <CreatePage />
            </ProtectedRoute>
          }
        />
      </Routes>

      {/* ==================== FOOTER ==================== */}
      <Flex
        as="footer"
        mt="auto" // Push footer to bottom
        py={4}
        justifyContent="center"
        alignItems="center"
        fontSize="sm"
        color="gray.500"
      >
        <Text color={useColorModeValue("gray.700", "gray.200")}>
          Created by{" "}
          <Link
            href="https://github.com/BrachoDev"
            isExternal // Opens link in new tab
            color="blue.400"
            fontWeight="bold"
            display="inline-flex"
            alignItems="center"
            gap={2}
          >
            BrachoDev <FaGithub size={"16"} />
          </Link>
        </Text>
      </Flex>
    </Box>
  );
}

export default App;