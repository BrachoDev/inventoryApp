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
  const { colorMode, toggleColorMode } = useColorMode();
  const { user, logout, token } = useAuthStore();
  const toast = useToast();

  const location = useLocation();
  const navigate = useNavigate();
  const textColor = useColorModeValue("gray.600", "black.200");

  const isLoginPage = location.pathname === "/login";

  return (
    <Container maxW={"1140px"} px={4}>
      <Flex
        h={16}
        alignItems={"center"}
        justifyContent={"space-between"}
        flexDir={{ base: "column", sm: "row" }}
      >
        <Text
          fontSize={{ base: "lg", sm: "xl" }}
          fontWeight={"bold"}
          textTransform={"uppercase"}
          textAlign={"center"}
          bgGradient={"linear(to-r, green.400, green.700)"}
          bgClip={"text"}
        >
          <Link to="/">Inventory App 🛒</Link>
        </Text>

        {/* RIGHT SIDE */}
        <VStack spacing={1} alignItems="flex-end">
          {/* TOP ROW: BUTTONS */}
          <HStack spacing={2}>
            {token && !isLoginPage && (
              <>
                <Link to="/">
                  <Button>
                    <House size={20} />
                  </Button>
                </Link>

                <Link to="/create">
                  <Button>
                    <SquarePlus size={20} />
                  </Button>
                </Link>
              </>
            )}

            <Button onClick={toggleColorMode}>
              {colorMode === "light" ? <Moon /> : <Sun />}
            </Button>

            {token && !isLoginPage && (
              <>
                <Button
                  colorScheme="red"
                  onClick={() => {
                    logout();
                    navigate("/login");
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
              </>
            )}
          </HStack>

          {/* BOTTOM ROW: USER INFO */}
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
