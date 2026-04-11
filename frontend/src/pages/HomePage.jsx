import {
  Container,
  Text,
  VStack,
  SimpleGrid,
  Input,
  HStack,
  Select,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../components/ui/ProductCard";
import { useProductStore } from "../store/product";

const HomePage = () => {
  const { fetchProducts, products } = useProductStore();
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const inputBg = useColorModeValue("gray.100", "gray.700");
  const inputColor = useColorModeValue("black", "white");
  const borderColor = useColorModeValue("gray.500", "gray.600");
  const buttonBg = useColorModeValue("gray.300", "gray.600");
  const buttonHover = useColorModeValue("gray.400", "gray.500");

  const [search, setSearch] = useState("");
  const [sortOption, setSortOption] = useState("");

  const filteredProducts = products
    .filter(
      (product) =>
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.binLocation.toLowerCase().includes(search.toLowerCase()),
    )
    .sort((a, b) => {
      switch (sortOption) {
        case "name-asc":
          return a.name.localeCompare(b.name);
        case "name-desc":
          return b.name.localeCompare(a.name);
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "binLocation-asc":
          return a.binLocation.localeCompare(b.binLocation);
        case "binLocation-desc":
          return b.binLocation.localeCompare(a.binLocation);
        default:
          return 0;
      }
    });

  return (
    <Container maxW="container.xl" py={12}>
      <VStack spacing={8}>
        <Text
          fontSize={"30"}
          fontWeight={"bold"}
          bgGradient={"linear(to-r, green.400, green.700)"}
          bgClip={"text"}
          textAlign={"center"}
        >
          Current Products 🏷️
        </Text>
        <HStack w="full" spacing={4} alignSelf={"left"}>
          <Input
            width={"lg"}
            placeholder="Search by name or bin location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            bg={inputBg}
            color={inputColor}
            borderColor={borderColor}
            _placeholder={{ color: useColorModeValue("gray.500", "gray.400") }}
          />
          <Button
            onClick={() => setSearch("")}
            bg={buttonBg}
            _hover={{ bg: buttonHover }}
          >
            Clear
          </Button>

          <Select
            placeholder="Sort"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            maxW="200px"
            bg={inputBg}
            color={inputColor}
            borderColor={borderColor}
          >
            <option value="name-asc">Name (A-Z)</option>
            <option value="name-desc">Name (Z-A)</option>
            <option value="price-asc">Price (Low → High)</option>
            <option value="price-desc">Price (High → Low)</option>
            <option value="binLocation-asc">Bin Location (Low → High)</option>
            <option value="binLocation-desc">Bin Location (High → Low)</option>
          </Select>
        </HStack>
        <SimpleGrid
          columns={{
            base: 1,
            md: 2,
            lg: 3,
          }}
          spacing={10}
          w={"full"}
        >
          {filteredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </SimpleGrid>

        {filteredProducts.length === 0 && (
          <Text
            fontSize="xl"
            textAlign={"center"}
            fontWeight="bold"
            color="gray.500"
          >
            No products found 😢{" "}
            <Link to={"/create"}>
              <Text
                as="span"
                color="blue.500"
                _hover={{ textDecoration: "underline" }}
              >
                Create a product
              </Text>
            </Link>
          </Text>
        )}
      </VStack>
    </Container>
  );
};
export default HomePage;
