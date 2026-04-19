// LoginPage.jsx
// Handles user authentication and account creation.
// Provides a login form for existing users and a modal
// for registering new accounts.

import { useAuthStore } from "@/store/auth";
import {
  Box,
  Button,
  Input,
  useColorModeValue,
  VStack,
  Heading,
  useToast,
  Container,
  FormControl,
  FormLabel,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  // Local state for login form
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Toast for user feedback
  const toast = useToast();

  // Navigation hook for redirecting after successful login
  const navigate = useNavigate();

  // Local state for registration form inside modal
  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  // Auth actions from Zustand store
  const { login, createUser } = useAuthStore();

  // Controls account creation modal state
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Handles login request and redirects user to home page on success
  const handleLogin = async () => {
    const { success, message } = await login({ email, password });

    if (!success) {
      toast({
        title: "Error",
        description: message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Success",
        description: message,
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      // Clear form inputs after successful login
      setEmail("");
      setPassword("");

      // Redirect authenticated user to the home page
      navigate("/");
    }
  };

  // Handles new account creation from the modal form
  const handleRegister = async () => {
    // Validate required fields before sending request
    if (!newUser.username || !newUser.email || !newUser.password) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        status: "error",
      });
      return;
    }

    // Ensure password confirmation matches
    if (newUser.password !== newUser.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        status: "error",
      });
      return;
    }

    const { success, message } = await createUser(newUser);

    if (!success) {
      toast({
        title: "Error",
        description: message,
        status: "error",
      });
    } else {
      toast({
        title: "Success",
        description: "Account created successfully",
        status: "success",
      });

      // Reset registration form after successful account creation
      setNewUser({
        username: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
      });

      // Close modal after registration completes
      onClose();
    }
  };

  return (
    <Container maxW={"container.sm"}>
      {/* Login form container */}
      <Box
        w={"full"}
        bg={useColorModeValue("white", "gray.800")}
        p={8}
        mt={10}
        rounded={"xl"}
        shadow={"lg"}
      >
        <VStack spacing={6}>
          <Heading size="xl">Log in</Heading>

          {/* Link-like text for opening account creation modal */}
          <Text
            fontSize="sm"
            textAlign={"center"}
            fontWeight="bold"
            color="gray.500"
          >
            Need an account?{" "}
            <Text
              as="span"
              color="blue.500"
              cursor="pointer"
              onClick={onOpen}
              _hover={{ textDecoration: "underline" }}
            >
              Create a new account
            </Text>
          </Text>

          {/* Login identifier input (username or email) */}
          <FormControl>
            <FormLabel>Username or Email</FormLabel>
            <Input
              placeholder=""
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>

          {/* Login password input */}
          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input
              placeholder=""
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>

          {/* Login submit button */}
          <Button colorScheme="blue" w="full" size="lg" onClick={handleLogin}>
            Log In
          </Button>
        </VStack>
      </Box>

      {/* Registration modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Account</ModalHeader>
          <ModalCloseButton />

          <ModalBody pb={6}>
            <VStack spacing={4}>
              {/* Username input */}
              <FormControl>
                <FormLabel>Username</FormLabel>
                <Input
                  name="username"
                  value={newUser.username}
                  onChange={(e) =>
                    setNewUser({ ...newUser, username: e.target.value })
                  }
                />
              </FormControl>

              {/* Email input */}
              <FormControl>
                <FormLabel>Email</FormLabel>
                <Input
                  name="email"
                  value={newUser.email}
                  onChange={(e) =>
                    setNewUser({ ...newUser, email: e.target.value })
                  }
                />
              </FormControl>

              {/* Optional phone number input */}
              <FormControl>
                <FormLabel>Phone Number (Optional)</FormLabel>
                <Input
                  name="phone"
                  value={newUser.phone}
                  onChange={(e) =>
                    setNewUser({ ...newUser, phone: e.target.value })
                  }
                />
              </FormControl>

              {/* Password input */}
              <FormControl>
                <FormLabel>Password</FormLabel>
                <Input
                  name="password"
                  type="password"
                  value={newUser.password}
                  onChange={(e) =>
                    setNewUser({ ...newUser, password: e.target.value })
                  }
                />
              </FormControl>

              {/* Confirm password input */}
              <FormControl>
                <FormLabel>Confirm Password</FormLabel>
                <Input
                  name="confirmPassword"
                  type="password"
                  value={newUser.confirmPassword}
                  onChange={(e) =>
                    setNewUser({ ...newUser, confirmPassword: e.target.value })
                  }
                />
              </FormControl>

              {/* Registration submit button */}
              <Button
                colorScheme="green"
                w="full"
                onClick={handleRegister}
              >
                Create Account
              </Button>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default LoginPage;
