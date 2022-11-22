import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { Box, Button, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const userSelector = useSelector((state) => state.user.value);
  const [activeStep, setActiveStep] = useState(0);
  const [isStepperUp, setIsStepperUp] = useState(false);

  const stepsButtons = [
    {
      text: "Sign In To Your Account/Create Your Account",
      disabled: userSelector.loggedIn,
      to: "/sign_up",
    },
    {
      text: "Connect To Your Spotify Account",
      disabled: !userSelector.loggedIn,
    },
    { text: "Create a Playlist", disabled: true, to: "/create" },
  ].map((step) => {
    return (
      <Button onClick={() => navigate(step.to)} disabled={step.disabled}>
        <Typography
          sx={{
            fontWeight: 500,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            maxWidth: "fit-content",
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
        scale: 0.6,
        scaleY: 1,
        y: -100,
      });
    } else {
      setAnimationProps(initialAnimationProps);
    }
  }, [isStepperUp]);

  useEffect(() => {
    setActiveStep(userSelector.loggedIn | 0); // if user is logged in = 1, otherwise: = 0
  }, [userSelector]);

  useEffect(() => {
    if (window.location.pathname === "" || window.location.pathname === "/") {
      setIsStepperUp(false);
    } else {
      setIsStepperUp(true);
    }
  }, [window.location.pathname]);

  return (
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
        sx={{
          width: "80%",
          backgroundColor: isStepperUp
            ? "transparent"
            : "rgb(255,255,255,0.45)",
          transition: "all .3s ease",
          WebkitTransition: "all .3s ease",
          MozTransition: "all .3s ease",
          padding: "2vh",
          borderRadius: "13vh",
        }}
      >
        <Stepper activeStep={activeStep} alternativeLabel>
          {stepsButtons.map((label, index) => (
            <Step key={index}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>
    </motion.div>
  );
};

export default HomePage;
