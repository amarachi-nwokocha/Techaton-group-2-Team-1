import { Box, Heading, SimpleGrid, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import gsap from "gsap-trial";
import ScrollTrigger from "gsap-trial/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Features = () => {
  useEffect(() => {
    const animation = gsap.fromTo(
      "#featuresCard",
      { opacity: 0, y: 100 },
      {
        opacity: 1,
        y: 0,
        duration: 0.3,

        stagger: { amount: 0.5 },
      }
    );
    ScrollTrigger.create({
      trigger: "#featuresBox",
      end: "30% 50%",
      markers: { startColor: "red", endColor: "green", fontWeight: "500" },
      animation,
      scrub: true,
      once: true,
    });
  }, []);

  const FeaturesArr = [
    {
      _id: 1,
      name: "Easy Access",
      desc: "Protrack is an App with intuitive interface and promotes team collaboration.",
    },
    {
      _id: 2,
      name: "Task Tracking",
      desc: "ProTrack helps you to track the status of tasks and your project progression.",
    },
    {
      _id: 3,
      name: "Visual Appeal",
      desc: "it is a simplified task management app with aesthetically pleasing design features.",
    },
    {
      _id: 4,
      name: "Task Scheduling",
      desc: "Our app allows users organize, create and manage assigned task.",
    },
    {
      _id: 5,
      name: "Effortless Collaboration",
      desc: "ProTrack is designed to promote simple and effortless team collaboration which will boost overall productivity.",
    },
    {
      _id: 6,
      name: "Task Prioritization",
      desc: "ProTrack helps you to prioritize tasks to make sure important jobs are done on time.",
    },
  ];
  return (
    <Box id="featuresBox" w="100%" justifySelf="stretch">
      <SimpleGrid
        columns={[1, 1, 2]}
        gap="60px"
        alignContent="space-between"
        justifyItems="center"
        height="100%">
        {FeaturesArr.map((feature) => (
          <Box id="featuresCard" key={feature._id}>
            <Heading
              fontSize={["30px", "30px", "24px"]}
              color="primary.600"
              textAlign={["center", "center", "start"]}
              mb="1rem">
              {feature.name}
            </Heading>
            <Text
              textAlign={["center", "center", "revert"]}
              paddingInlineEnd="1rem"
              fontSize="16px"
              fontWeight="medium">
              {feature.desc}
            </Text>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default Features;
