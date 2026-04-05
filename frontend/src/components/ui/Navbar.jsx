import {
  Container,
  Flex,
  Text,
  HStack,
  Button,
  useColorMode,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { SquarePlus, Sun, Moon, House } from "lucide-react";

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
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

        <HStack spacing={2} alignItems={"center"}>
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
          <Button onClick={toggleColorMode}>
            {colorMode === "light" ? <Moon /> : <Sun />}
          </Button>
        </HStack>
      </Flex>
    </Container>
  );
};

export default Navbar;
