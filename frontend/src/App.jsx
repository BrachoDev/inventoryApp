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
  const checkAuth = useAuthStore((state) => state.checkAuth);

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <Box
      minH={"100vh"}
      display={"flex"}
      flexDirection={"column"}
      bg={useColorModeValue("gray.100", "gray.900")}
    >
      <Navbar />
      <Routes>
        {/* Public Route */}
        <Route path="/login" element={<LoginPage />} />

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/create"
          element={
            <ProtectedRoute>
              <CreatePage />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Flex
        as="footer"
        mt="auto"
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
            isExternal
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
