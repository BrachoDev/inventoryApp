// CreatePage.jsx
// Page responsible for creating new inventory products.
// Handles form input, local state, and sending data to the backend.

import { useProductStore } from "@/store/product";
import {
  Box,
  Container,
  Heading,
  Input,
  Button,
  useColorModeValue,
  VStack,
  useToast,
  Text,
  Link,
} from "@chakra-ui/react";
import { useState } from "react";

const CreatePage = () => {
  // Local state to store form input values
  const [newProduct, setNewProduct] = useState({
    name: "",
    image: "",
    binLocation: "",
    price: "",
    quantity: "",
  });

  // Toast for user feedback (success/error messages)
  const toast = useToast();

  // Access createProduct function from Zustand store
  const { createProduct } = useProductStore();

  // Handles product creation by sending data to backend
  const handleAddProduct = async () => {
    const { success, message } = await createProduct(newProduct);

    if (!success) {
      // Show error message if request fails
      toast({
        title: "Error",
        description: message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } else {
      // Show success message and reset form fields
      toast({
        title: "Success",
        description: message,
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      setNewProduct({
        name: "",
        image: "",
        binLocation: "",
        price: "",
        quantity: "",
      });
    }
  };

  return (
    <Container maxW={"container.sm"} py={12}>
      <VStack spacing={8}>
        {/* Page title */}
        <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
          Create New Product
        </Heading>
      </VStack>

      {/* Form container */}
      <Box
        w={"full"}
        bg={useColorModeValue("white", "gray.800")}
        p={6}
        rounded={"lg"}
        shadow={"md"}
      >
        <VStack spacing={4}>
          {/* Product name input */}
          <Input
            placeholder="Product Name"
            name="name"
            value={newProduct.name}
            onChange={(e) =>
              setNewProduct({ ...newProduct, name: e.target.value })
            }
          />

          {/* Image URL input */}
          <Input
            placeholder="Image URL"
            name="image"
            value={newProduct.image}
            onChange={(e) =>
              setNewProduct({ ...newProduct, image: e.target.value })
            }
          />

          {/* Helper text for finding images */}
          <Text
            fontSize="s"
            color={useColorModeValue("gray.600", "gray.500")}
            textAlign="left"
            w="full"
          >
            Need an image URL? Find one{" "}
            <Link
              href="https://unsplash.com"
              color={useColorModeValue("blue.500", "blue.300")}
              isExternal
            >
              here
            </Link>
          </Text>

          {/* Bin location input */}
          <Input
            placeholder="Bin Location"
            name="binLocation"
            value={newProduct.binLocation}
            onChange={(e) =>
              setNewProduct({ ...newProduct, binLocation: e.target.value })
            }
          />

          {/* Price input (converted to number) */}
          <Input
            placeholder="Price"
            name="price"
            type="number"
            value={newProduct.price}
            onChange={(e) =>
              setNewProduct({
                ...newProduct,
                price: parseFloat(e.target.value) || 0,
              })
            }
          />

          {/* Quantity input (converted to integer) */}
          <Input
            placeholder="Quantity"
            name="quantity"
            type="number"
            value={newProduct.quantity}
            onChange={(e) =>
              setNewProduct({
                ...newProduct,
                quantity: parseInt(e.target.value) || 0,
              })
            }
          />

          {/* Submit button */}
          <Button colorScheme="green" onClick={handleAddProduct} w="full">
            Create Product
          </Button>
        </VStack>
      </Box>
    </Container>
  );
};

export default CreatePage;
