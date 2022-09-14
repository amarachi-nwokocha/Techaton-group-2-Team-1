import React, { useEffect } from "react";
import {
  Box,
  Container,
  Heading,
  Image,
  Text,
  Highlight,
} from "@chakra-ui/react";
import share from "../../../Asset/illustration_share.svg";
import gsap from "gsap-trial";
import ScrollTrigger from "gsap-trial/ScrollTrigger";

const Share = () => {
  useEffect(() => {
    const animation = gsap.fromTo(
      "#shareHead",
      { opacity: 0, y: 100 },
      {
        opacity: 1,
        y: 0,
        duration: 1,

        stagger: { amount: 0.5 },
      }
    );
    ScrollTrigger.create({
      trigger: "#shareBox",
      start: "-20% 80%",
      animation,
      once: true,
    });
  }, []);
  return (
    <Container
      id="shareBox"
      display="flex"
      mt={["5rem", "5rem", "2rem"]}
      mb="3rem"
      flexDirection={["column-reverse", "column-reverse", "row-reverse"]}
      alignItems="center"
      paddingInline="0"
      gap="3rem"
      justifyContent={["space-evenly", "space-evenly", "space-between"]}
      maxW="90vw">
      <Box>
        <Heading
          id="shareHead"
          noOfLines={2}
          fontSize={["20px", "24px", "32px", "48px"]}
          lineHeight={["24px", "32px", "40px", "60px"]}>
          <Highlight
            query={["Share", "communicate", "team"]}
            styles={{
              color: "transparent",
              bgClip: "text",
              bgGradient: "linear(to-r, primary.500,primary.700)",
            }}>
            Share and communicate with your team online
          </Highlight>
        </Heading>
        <Text id="shareHead" mt={"20px"} fontSize="16px" lineHeight="24px">
          Share your to-do list and project online for free with your team mate,
          collaborate and communicate together..
        </Text>
      </Box>
      <Box h="fit-content" w="60vw" maxW="700px" minW="300px">
        <Image src={share} />
      </Box>
    </Container>
  );
};

export default Share;
