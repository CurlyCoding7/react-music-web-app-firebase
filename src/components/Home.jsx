import { Box, Container, Heading, Stack, Text } from "@chakra-ui/react";
import { Card, CardBody } from "@chakra-ui/react";
import { Image } from "@chakra-ui/react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import img1 from "../assets/11.jpg";
import img2 from "../assets/7.jpg";
import img3 from "../assets/8.jpg";
import img4 from "../assets/9.jpg";
import img5 from "../assets/12.jpg";
import img6 from "../assets/13.jpg";
import img7 from "../assets/14.jpg";

const headingOptions = {
  pos: "absolute",
  left: "50%",
  top: "50%",
  transform: "translate(-50%,-50%)",
  textTransform: "uppercase",
  p: "4",
  size: "4xl",
};

const Home = () => {
  return (
    <Box>
      <MyCarousel />
      <Container maxW={"container.xl"} minH={"100vh"} p="16">
        <Heading
          textTransform={"uppercase"}
          py={2}
          w={"fit-content"}
          borderBottom={"2px solid"}
          m={"auto"}
        >
          My Favourites
        </Heading>

        <Stack
          h={"full"}
          p={4}
          alignItems={"center"}
          direction={["column", "row"]}
        >
          <Card maxW="sm">
            <CardBody>
              <Image src={img5} alt="music album" borderRadius="lg" />
              <Stack mt="6" spacing="3">
                <Heading size="md">Music is love</Heading>
                <Text>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum
                  beatae iste omnis eaque, rerum magnam tempore possimus soluta
                  hic, minus, officia voluptate sunt impedit fuga eveniet iusto
                  cumque qui dolore odit accusantium modi. Id harum, quis aut,
                  cumque quaerat earum impedit reiciendis eius voluptatem quidem
                  minus vel et! Mollitia, enim.
                </Text>
                <Text color="blue.600" fontSize="2xl">
                  Calm
                </Text>
              </Stack>
            </CardBody>
          </Card>

          <Card maxW="sm">
            <CardBody>
              <Image src={img6} alt="music album" borderRadius="lg" />
              <Stack mt="6" spacing="3">
                <Heading size="md">Happy go lucky</Heading>
                <Text>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum
                  beatae iste omnis eaque, rerum magnam tempore possimus soluta
                  hic, minus, officia voluptate sunt impedit fuga eveniet iusto
                  cumque qui dolore odit accusantium modi. Id harum, quis aut,
                  cumque quaerat earum impedit reiciendis eius voluptatem quidem
                  minus vel et! Mollitia, enim.
                </Text>
                <Text color="blue.600" fontSize="2xl">
                  Peaceful
                </Text>
              </Stack>
            </CardBody>
          </Card>

          <Card maxW="sm">
            <CardBody>
              <Image src={img7} alt="music album" borderRadius="lg" />
              <Stack mt="6" spacing="3">
                <Heading size="md">Be yourself</Heading>
                <Text>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum
                  beatae iste omnis eaque, rerum magnam tempore possimus soluta
                  hic, minus, officia voluptate sunt impedit fuga eveniet iusto
                  cumque qui dolore odit accusantium modi. Id harum, quis aut,
                  cumque quaerat earum impedit reiciendis eius voluptatem quidem
                  minus vel et! Mollitia, enim.
                </Text>
                <Text color="blue.600" fontSize="2xl">
                  Melody
                </Text>
              </Stack>
            </CardBody>
          </Card>
        </Stack>
      </Container>
    </Box>
  );
};

const MyCarousel = () => (
  <Carousel
    autoPlay
    infiniteLoop
    interval={3000}
    showStatus={false}
    showThumbs={false}
    showArrows={false}
  >
    <Box w="full" h={"100vh"}>
      <Image src={img1} />
      <Heading bgColor={"blackAlpha.600"} color={"white"} {...headingOptions}>
        Without music, life would be a mistake.
      </Heading>
    </Box>

    <Box w="full" h={"100vh"}>
      <Image src={img2} />
      <Heading bgColor={"blackAlpha.600"} color={"white"} {...headingOptions}>
        Where words fail, music speaks.
      </Heading>
    </Box>

    <Box w="full" h={"100vh"}>
      <Image src={img3} />
      <Heading bgColor={"blackAlpha.600"} color={"white"} {...headingOptions}>
        Music is the strongest form of magic.
      </Heading>
    </Box>

    <Box w="full" h={"100vh"}>
      <Image src={img4} />
      <Heading bgColor={"blackAlpha.600"} color={"white"} {...headingOptions}>
        If music be the food of love, play on.
      </Heading>
    </Box>
  </Carousel>
);

export default Home;
