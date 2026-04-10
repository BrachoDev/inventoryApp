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
  Link,
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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast();
  const navigate = useNavigate();
  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  const { login, createUser } = useAuthStore();
  const { isOpen, onOpen, onClose } = useDisclosure();

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

      setEmail("");
      setPassword("");

      // redirect to homepage
      navigate("/");
    }
  };

  const handleRegister = async () => {
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

      setNewUser({
        username: "",
        email: "",
        password: "",
      });

      onClose();
    }
  };

  return (
    <Container maxW={"container.sm"}>
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

          <FormControl>
            <FormLabel>Username or Email</FormLabel>
            <Input
              placeholder=""
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input
              placeholder=""
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>

          <Button colorScheme="blue" w="full" size="lg" onClick={handleLogin}>
            Log In
          </Button>
        </VStack>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Account</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <VStack spacing={4}>
              <FormControl>
                <FormLabel>Username</FormLabel>
                <Input
                  value={newUser.username}
                  onChange={(e) =>
                    setNewUser({ ...newUser, username: e.target.value })
                  }
                />
              </FormControl>

              <FormControl>
                <FormLabel>Email</FormLabel>
                <Input
                  value={newUser.email}
                  onChange={(e) =>
                    setNewUser({ ...newUser, email: e.target.value })
                  }
                />
              </FormControl>

              <FormControl>
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  value={newUser.password}
                  onChange={(e) =>
                    setNewUser({ ...newUser, password: e.target.value })
                  }
                />
              </FormControl>

              <Button colorScheme="green" w="full" onClick={handleRegister}>
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
