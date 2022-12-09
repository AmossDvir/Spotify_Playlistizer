import React from "react";
import MovingComponent from "react-moving-text";
import { Box } from "@mui/material";
import AnimatedText from "../generalComponents/AnimatedText";

const title = "Welcome.";
const subTitle = "This tool will help you create playlists by your favorite genres";
const Home = () => {
  var time = 0;
  setTimeout(() => sessionStorage.setItem("firstTime", true), 2000);
  return (
    <Box justifyContent="center" display="flex" fontSize={30} fontFamily="Jost" alignItems="center">
      {!sessionStorage.getItem("firstTime") ? (
        <AnimatedText
          textLines={[
            { value: title, style: { fontSize: 50 }, delay: 1 },
            {
              value:subTitle,
              style: { fontSize: 35, textAlign:"center"  },
              delay: 1.5,
            },
          ]}
          time={time}
        >
          Welcome.
        </AnimatedText>
      ) : (
        <div>
          <Box
            alignItems="center"
            display="flex"
            mt={10}
            flexDirection="column"
            fontSize={30}
            fontFamily="Jost"
            style={{ cursor: "default", textAlign:"center" }}
          ><div style={{fontSize:50}}>{title}</div><div>{subTitle}</div></Box>
        </div>
      )}
    </Box>
  );
};

export default Home;
