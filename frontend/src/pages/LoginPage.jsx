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
} from "@chakra-ui/react";
import { useState } from "react";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast();

  const { login } = useAuthStore();

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

      // later: redirect to homepage
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
            <Link to={"/create"}>
              <Text
                as="span"
                color="blue.500"
                _hover={{ textDecoration: "underline" }}
              >
                Create a new account
              </Text>
            </Link>
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
    </Container>
  );
};

export default LoginPage;
