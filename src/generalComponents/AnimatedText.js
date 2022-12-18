import React from "react";
import MovingComponent from "react-moving-text";
import { Box } from "@mui/material";

// API: textLines is array of object, each has 'value', 'style', 'delay', 'duration' keys
const AnimatedText = ({ textLines, ...rest }) => {
  var time = 0;
  return (
    <Box
      alignItems="center"
      display="flex"
      mt={10}
      flexDirection="column"
      fontSize={30}
      fontFamily="Jost"
      textAlign='center'
      style={{cursor:'default'}}
      sx={{textAlign:'center'}}
      {...rest}
    >
      {textLines.map((line, index) => (
        <MovingComponent
        key={index}
          type="fadeInFromBottom"
          duration={`${line.duration ?? 1100}ms`}
          delay={`${(time += line.delay)}s`}
          direction={line.direction ?? "normal"}
          timing="ease-in-out"
          iteration={line.infinite? "infinite": "1"}
          fillMode="both"
          style={line.style ?? { fontSize: 30, textAlign:'center' }}
        >
          {line.value}
        </MovingComponent>
      ))}
    </Box>
  );
  //   <Box
  //     alignItems="center"
  //     display="flex"
  //     mt={10}
  //     flexDirection="column"
  //     fontSize={30}
  //     fontFamily="Jost"
  //   >
  //   <MovingComponent
  // type="fadeInFromBottom"
  // duration="1500ms"
  // delay={`${(time += 1)}s`}
  // direction="normal"
  // timing="ease-in-out"
  // iteration="1"
  // fillMode="both"
  // style={{ fontSize: 50 }}
  //   >
  //     {children}
  //   </MovingComponent>
  // </Box>
};

export default AnimatedText;
