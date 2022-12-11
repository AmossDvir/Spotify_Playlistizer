import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Stepper as MuiStepper } from "@mui/material";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { Box, Button, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { routes } from "../constants";
import { openSpotifyWindow } from "../controllers/spotify/openSpotifyWindow";
import "./Stepper.css"
import UseMobileWidth from "../generalComponents/UseMobileWidth";

const Stepper = () => {
  const navigate = useNavigate();
  const userSelector = useSelector((state) => state.user.value);
  const [activeStep, setActiveStep] = useState(0);
  const [isStepperUp, setIsStepperUp] = useState(false);
  // const [isMobile, setIsMobile] = useState(false);
  const isMobile = UseMobileWidth();
  // const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  // window.addEventListener("resize", () => setIsMobile(window.innerWidth < 700));

  // useEffect(() => {console.log(isMobile);setIsMobile(windowWidth < 500)}, [windowWidth]);

  const stepsButtons = [
    {
      text: `Sign In${isMobile?"/Sign Up":" To Your Account/Create Your Account"}`,
      disabled: userSelector.loggedIn,
      onClick: () => navigate(routes.signUp.url),
    },
    {
      text: `Connect${isMobile?" To Spotify":" To Your Account/Create Your Account"}`,
      // text: "Connect To Your Spotify Account",
      disabled: !(
        userSelector.loggedIn && !localStorage.getItem(userSelector.userId + "spotifyAccessToken")
      ),
      onClick: () => openSpotifyWindow(userSelector.userId),
    },
    {
      text: "Create a Playlist",
      disabled: !(
        userSelector.loggedIn && localStorage.getItem(userSelector.userId + "spotifyAccessToken")
      ),
      onClick: () => navigate(routes.create.url),
    },
  ].map((step) => {
    return (
      <Button onClick={step.onClick} disabled={step.disabled}>
        <Typography className="stepper-label"
          sx={{
            fontWeight: 500,
            // fontSize:"1px",
            // whiteSpace: "nowrap",
            // overflow: "hidden",
            // textOverflow: "ellipsis",
            // width:window.innerWidth/2,
            // maxWidth: "500px",
          }}
        >
          {step.text}
        </Typography>
      </Button>
    );
  });

  const initialAnimationProps = {
    scale: 1,
    scaleY: 1,
    y: [-100, 400, 300],
  };
  const [animationProps, setAnimationProps] = useState();

  

  useEffect(() => {
    if (isStepperUp) {
      setAnimationProps({
        scale: 0.55,
        scaleY: 1,
        y: -100,
      });
    } else {
      setAnimationProps(initialAnimationProps);
    }
  }, [isStepperUp]);

  useEffect(() => {
    setActiveStep(
      userSelector.loggedIn
        ? localStorage.getItem(userSelector.userId + "spotifyAccessToken")
          ? 2
          : 1
        : 0
    ); // if user is logged in = 1, otherwise: = 0
  }, [userSelector, localStorage.getItem(userSelector.userId + "spotifyAccessToken")]);

  useEffect(() => {
    if (window.location.pathname === "" || window.location.pathname === routes.home.url) {
      setIsStepperUp(false);
    } else {
      setIsStepperUp(true);
    }
  }, [window.location.pathname]);

  return ( isStepperUp && isMobile? <></>:
    <motion.div
      animate={animationProps}
      transition={{ type: "spring", duration: 1 }}
      initial={{ scale: 0 }}
      style={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
        position: "absolute",
        zIndex: "2",
      }}
    >
      <Box
      className="stepper-frame"
        sx={{

          backgroundColor: isStepperUp
            ? "transparent"
            : "rgb(255,255,255,0.45)",


        }}
      >
        <MuiStepper activeStep={activeStep} alternativeLabel>
          {stepsButtons.map((label, index) => (
            <Step key={index}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </MuiStepper>
      </Box>
    </motion.div>
  );
};

export default Stepper;
