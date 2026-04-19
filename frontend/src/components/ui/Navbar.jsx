// Navbar.jsx
// Navigation bar component displayed across the application.
// Shows different options based on authentication state,
// and provides theme toggle and logout functionality.

import {
  Container,
  Flex,
  Text,
  HStack,
  VStack,
  Button,
  useColorMode,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { SquarePlus, Sun, Moon, House, LogOut } from "lucide-react";
import { useAuthStore } from "@/store/auth";

const Navbar = () => {
  // Chakra UI color mode (light/dark)
  const { colorMode, toggleColorMode } = useColorMode();

  // Auth state and actions from Zustand store
  const { user, logout, token } = useAuthStore();

  // Toast for user feedback (e.g., logout success)
  const toast = useToast();

  // React Router hooks for navigation and route detection
  const location = useLocation();
  const navigate = useNavigate();

  // Dynamic text color based on theme
  const textColor = useColorModeValue("gray.600", "black.200");

  // Check if current page is login page
  // Used to hide certain UI elements
  const isLoginPage = location.pathname === "/login";

  return (
    <Container maxW={"1140px"} px={4}>
      <Flex
        h={16}
        alignItems={"center"}
        justifyContent={"space-between"}
        flexDir={{ base: "column", sm: "row" }}
      >
        {/* ==================== APP TITLE ==================== */}
        <Text
          fontSize={{ base: "lg", sm: "xl" }}
          fontWeight={"bold"}
          textTransform={"uppercase"}
          textAlign={"center"}
          bgGradient={"linear(to-r, green.400, green.700)"}
          bgClip={"text"}
        >
          {/* Clicking title navigates to home */}
          <Link to="/">Inventory App 🛒</Link>
        </Text>

        {/* ==================== RIGHT SIDE ==================== */}
        <VStack spacing={1} alignItems="flex-end">
          {/* ---------- TOP ROW: ACTION BUTTONS ---------- */}
          <HStack spacing={2}>
            {/* Show navigation buttons only when user is logged in */}
            {token && !isLoginPage && (
              <>
                {/* Home button */}
                <Link to="/">
                  <Button>
                    <House size={20} />
                  </Button>
                </Link>

                {/* Create product button */}
                <Link to="/create">
                  <Button>
                    <SquarePlus size={20} />
                  </Button>
                </Link>
              </>
            )}

            {/* Toggle between light and dark mode */}
            <Button onClick={toggleColorMode}>
              {colorMode === "light" ? <Moon /> : <Sun />}
            </Button>

            {/* Logout button (only visible when logged in) */}
            {token && !isLoginPage && (
              <Button
                colorScheme="red"
                onClick={() => {
                  // Clear auth state
                  logout();

                  // Redirect to login page
                  navigate("/login");

                  // Show confirmation message
                  toast({
                    title: "Logged out",
                    description: "You have been logged out successfully.",
                    status: "info",
                    duration: 3000,
                    isClosable: true,
                  });
                }}
              >
                <LogOut />
              </Button>
            )}
          </HStack>

          {/* ---------- BOTTOM ROW: USER INFO ---------- */}
          {/* Display current logged-in user */}
          {token && !isLoginPage && (
            <Text fontSize="l" color={textColor} fontWeight="bold">
              Logged in as {user?.username}
            </Text>
          )}
        </VStack>
      </Flex>
    </Container>
  );
};

export default Navbar;