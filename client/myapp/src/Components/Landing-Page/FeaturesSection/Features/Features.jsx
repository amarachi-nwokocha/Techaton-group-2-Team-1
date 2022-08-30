import { Box, Heading, SimpleGrid, Text } from "@chakra-ui/react";
import React from "react";

const Features = () => {
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
    <Box w="100%" justifySelf="stretch">
      <SimpleGrid
        columns={2}
        gap="0.2rem"
        alignContent="space-between"
        justifyItems="center"
        height="100%">
        {FeaturesArr.map((feature) => (
          <Box maxW="362px" height="300px" key={feature._id}>
            <Heading fontSize="24px" textAlign="center" mb="1rem">
              {feature.name}
            </Heading>
            <Text fontSize="16px" textAlign="end" fontWeight="medium">
              {feature.desc}
            </Text>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default Features;
