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
} from "@chakra-ui/react";
import { Trash2, SquarePen } from "lucide-react";

const ProductCard = ({ product }) => {
  const textColor = useColorModeValue("gray.600", "gray.200");
  const bg = useColorModeValue("white", "gray.800");

  const { deleteProduct } = useProductStore();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
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
  return (
    <Box
      shadow="lg"
      rounded="lg"
      overflow="hidden"
      transition="all 0.3s"
      _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
      bg={bg}
    >
      <Image
        src={product.image}
        alt={product.name}
        objectFit="cover"
        w="full"
        h={48}
      />
      <Box p={4}>
        <Heading as="h3" size="md" mb={2}>
          {product.name}
        </Heading>

        <Text fontWeight="bold" fontSize="xl" color={textColor} mb={4}>
          ${product.price.toFixed(2)}
        </Text>

        <HStack mb={3}>
          <Badge colorScheme="green">📦 Qty: {product.quantity}</Badge>
          <Badge colorScheme="purple">📍 BIN: {product.binLocation}</Badge>
        </HStack>

        <HStack spacing={2}>
          <IconButton icon={<SquarePen />} colorScheme="blue" />
          <IconButton
            icon={<Trash2 />}
            onClick={() => handleDeleteProduct(product._id)}
            colorScheme="red"
          />
        </HStack>
      </Box>

      {/* The code below is for the update modal */}
      {/* <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay></ModalOverlay>
      </Modal> */}
    </Box>
  );
};
export default ProductCard;
