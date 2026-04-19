// ProductCard.jsx
// Displays a single product in the inventory list.
// Allows the user to update or delete the product
// directly from the card using action buttons and a modal form.

import { useProductStore } from "@/store/product";
import {
  Box,
  Heading,
  HStack,
  Image,
  Text,
  IconButton,
  useColorModeValue,
  useToast,
  Badge,
  Modal,
  useDisclosure,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  VStack,
  Input,
  FormControl,
  FormLabel,
  ModalFooter,
  Button,
} from "@chakra-ui/react";
import { Trash2, SquarePen } from "lucide-react";
import { useState } from "react";

const ProductCard = ({ product }) => {
  // Local state used to store the editable version of the product
  // before submitting changes to the backend
  const [updatedProduct, setUpdatedProduct] = useState(product);

  // Dynamic colors based on light/dark theme
  const textColor = useColorModeValue("gray.600", "gray.200");
  const bg = useColorModeValue("white", "gray.800");

  // Product actions from Zustand store
  const { deleteProduct, updateProduct } = useProductStore();

  // Toast used for success/error feedback
  const toast = useToast();

  // Controls modal open/close state
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Deletes a product by ID and shows feedback to the user
  const handleDeleteProduct = async (pid) => {
    const { success, message } = await deleteProduct(pid);

    if (!success) {
      toast({
        title: "Error",
        description: message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    } else {
      toast({
        title: "Success",
        description: message,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  // Updates a product by ID using the edited form values
  // and closes the modal after submission
  const handleUpdateProduct = async (pid, updatedProduct) => {
    const { success, message } = await updateProduct(pid, updatedProduct);
    onClose();

    if (!success) {
      toast({
        title: "Error",
        description: message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    } else {
      toast({
        title: "Success",
        description: message,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box
      shadow="lg"
      rounded="lg"
      overflow="hidden"
      transition="all 0.3s"
      _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
      bg={bg}
    >
      {/* Product image shown at the top of the card */}
      <Image
        src={product.image}
        alt={product.name}
        objectFit="cover"
        w="full"
        h={48}
      />

      <Box p={4}>
        {/* Product name */}
        <Heading as="h3" size="md" mb={2}>
          {product.name}
        </Heading>

        {/* Product price */}
        <Text fontWeight="bold" fontSize="xl" color={textColor} mb={4}>
          ${product.price.toFixed(2)}
        </Text>

        {/* Extra inventory details */}
        <HStack mb={3}>
          <Badge colorScheme="green">📦 Qty: {product.quantity}</Badge>
          <Badge colorScheme="purple">📍 BIN: {product.binLocation}</Badge>
        </HStack>

        {/* Action buttons for updating and deleting the product */}
        <HStack spacing={2}>
          <IconButton
            icon={<SquarePen />}
            colorScheme="blue"
            onClick={onOpen}
            aria-label="Edit product"
          />
          <IconButton
            icon={<Trash2 />}
            onClick={() => handleDeleteProduct(product._id)}
            colorScheme="red"
            aria-label="Delete product"
          />
        </HStack>
      </Box>

      {/* Modal form used to update product information */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Product</ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <VStack spacing={4}>
              {/* Product name input */}
              <FormControl>
                <FormLabel>Name:</FormLabel>
                <Input
                  name="name"
                  value={updatedProduct.name}
                  onChange={(e) =>
                    setUpdatedProduct({
                      ...updatedProduct,
                      name: e.target.value,
                    })
                  }
                />
              </FormControl>

              {/* Product price input */}
              <FormControl>
                <FormLabel>Price:</FormLabel>
                <Input
                  name="price"
                  type="number"
                  value={updatedProduct.price}
                  onChange={(e) =>
                    setUpdatedProduct({
                      ...updatedProduct,
                      price: parseFloat(e.target.value),
                    })
                  }
                />
              </FormControl>

              {/* Product image URL input */}
              <FormControl>
                <FormLabel>Image URL:</FormLabel>
                <Input
                  name="image"
                  value={updatedProduct.image}
                  onChange={(e) =>
                    setUpdatedProduct({
                      ...updatedProduct,
                      image: e.target.value,
                    })
                  }
                />
              </FormControl>

              {/* Product quantity input */}
              <FormControl>
                <FormLabel>Quantity:</FormLabel>
                <Input
                  name="quantity"
                  type="number"
                  value={updatedProduct.quantity}
                  onChange={(e) =>
                    setUpdatedProduct({
                      ...updatedProduct,
                      quantity: parseInt(e.target.value),
                    })
                  }
                />
              </FormControl>

              {/* Product bin location input */}
              <FormControl>
                <FormLabel>Bin Location:</FormLabel>
                <Input
                  name="binLocation"
                  value={updatedProduct.binLocation}
                  onChange={(e) =>
                    setUpdatedProduct({
                      ...updatedProduct,
                      binLocation: e.target.value,
                    })
                  }
                />
              </FormControl>
            </VStack>
          </ModalBody>

          <ModalFooter>
            {/* Save updated product */}
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => handleUpdateProduct(product._id, updatedProduct)}
            >
              Update
            </Button>

            {/* Close modal without saving */}
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ProductCard;