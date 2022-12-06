import MovingComponent from "react-moving-text";
import { Box } from "@mui/material";
import React from "react";

const Home = () => {
    var time = 0;
  return (
    <Box justifyContent='center' display='flex' mt={10}>
    <MovingComponent
      type="fadeInFromBottom"
      duration="1100ms"
      delay={`${time += 1}s`}
      direction="normal"
      timing="ease-in-out"
      iteration="1"
      fillMode="both"
    >
      React-Moving-Text
    </MovingComponent>
    <MovingComponent
      type="fadeInFromBottom"
      duration="1100ms"
      delay={`${time += 1}s`}
      direction="normal"
      timing="ease-in-out"
      iteration="1"
      fillMode="both"
    >
      React-Moving-Text
    </MovingComponent>
    </Box>
  );
};

export default Home;
