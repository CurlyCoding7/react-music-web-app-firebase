import {
  Box,
  Button,
  Heading,
  Stack,
  VStack,
  HStack,
  Input,
  Text,
} from "@chakra-ui/react";
import { BiSend } from "react-icons/bi";
const Footer = () => {
  return (
    <Box bgColor={"blackAlpha.900"} minH={40} p={16} color={"white"}>
      <Stack direction={["column", "row"]}>
        <VStack alignItems={"stretch"} w={"full"} px={4}>
          <Heading
            size={"md"}
            textTransform={"uppercase"}
            textAlign={["center", "left"]}
          >
            Subscribe to get updates
          </Heading>

          <HStack>
            <Input placeholder="Enter email..." focusBorderColor="none" />
            <Button
              p={0}
              colorScheme="purple"
              variant={"ghost"}
              borderRadius={"0 20px 20px 0"}
            >
              <BiSend />
            </Button>
          </HStack>
        </VStack>

        <VStack
          w={"full"}
          borderLeft={["none", "1px solid white"]}
          borderRight={["none", "1px solid white"]}
        >
          <Heading textTransform={"uppercase"} textAlign={"center"}>
            Audio Hub
          </Heading>

          <Text>All rights reserved</Text>
        </VStack>

        <VStack w={"full"}>
          <Heading size={"md"} textTransform={"uppercase"}>
            Social Media
          </Heading>
          <Button variant={"link"} colorScheme="white">
            <a href="#" target="blank">
              YouTube
            </a>
          </Button>

          <Button variant={"link"} colorScheme="white">
            <a href="#">Instagram</a>
          </Button>

          <Button variant={"link"} colorScheme="white">
            <a href="#">GitHub</a>
          </Button>
        </VStack>
      </Stack>
    </Box>
  );
};

export default Footer;
