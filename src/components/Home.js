import React from "react";
import MovingComponent from "react-moving-text";
import { Box } from "@mui/material";
import AnimatedText from "../generalComponents/AnimatedText";

const Home = () => {
  var time = 0;
  return (
    // <Box alignItems="center" display="flex" mt={10} flexDirection="column" fontSize={30} fontFamily="Jost">

    <AnimatedText
      textLines={[
        { value: "Welcome.", style: { fontSize: 50 }, delay: 1 },
        {
          value:
            "This tool will help you create your playlists by your favorite genres",
          style: { fontSize: 35 },
          delay: 1.5,
        },
      ]}
      time={time}
    >
      Welcome.
    </AnimatedText>

    // </Box>
  );
};

export default Home;
