import React, { useEffect } from "react";
import {
  Heading,
  Highlight,
  Box,
  Text,
  InputGroup,
  Input,
  Link,
} from "@chakra-ui/react";
import CustomButton from "../../../Common/Button/CustomButton";
import gsap from "gsap-trial";
const Rightpane = () => {
  useEffect(() => {
    gsap
      .timeline()
      .fromTo(
        ".css-1bqt1r8",
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1,
          ease: "linear",
          stagger: { each: 0.5, ease: "linear" },
        }
      )
      .fromTo(
        "#heroAnimate :not(.css-1bqt1r8)",
        { opacity: 0, y: 100 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "linear",
          stagger: { amount: 0.5, ease: "back2.In" },
        },
        "<0.1"
      );
  }, []);

  return (
    <Box className="HeroContent" maxW="42rem">
      <Heading
        id="heroAnimate"
        as="h1"
        fontSize={["28px", "32px", "52px", "64px"]}
        lineHeight={["32px", "42px", "60px", "78px"]}
        textAlign={["center", "center", "revert"]}
        mb="1rem">
        <Highlight
          query={["Collaborate", "Plan", "Manage"]}
          styles={{
            color: "transparent",
            bgClip: "text",
            bgGradient: "linear(to-r, primary.500,primary.700)",
          }}>
          Protrack helps team to Collaborate, Plan and Manage tasks.
        </Highlight>
      </Heading>
      <Text
        id="heroAnimate"
        textAlign={["center", "center", "revert"]}
        fontSize={["16px", "16px", "20px", "24px"]}
        fontWeight={["medium", "medium", "semibold"]}>
        Seamlessly manage projects, track task and collaborate with your team
        across multiple projects; all from one tool.
      </Text>
      <InputGroup
        id="heroAnimate"
        display="flex"
        flexDirection={["column", "column", "row"]}
        alignItems="center"
        gap="2rem"
        mt="1rem"
        paddingInlineEnd={["0", "0", "14"]}>
        <Input
          width={["100%", "100%", "160%"]}
          type="email"
          placeholder="Email"
          border="2px solid transparent;"
          _focus={{ boxShadow: "inset 1px 1px 5px 2px black", outline: "none" }}
          _focusWithin={{ boxShadow: "inset 1px 1px 5px 2px black" }}
          boxShadow="inset -4px -3px 5px -1px #0000004f, 2px 2px 4px 1px #80808066"
        />
        <CustomButton
          boxShadow="inset -4px -3px 5px -1px #0000004f, 2px 2px 4px 1px #80808066"
          text={
            <Link w="100%" _hover={{ textDecoration: "none" }} href="/signin">
              Sign in
            </Link>
          }
        />
      </InputGroup>
    </Box>
  );
};

export default Rightpane;
