import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { Box, Button } from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

const stepsButtons = [
  "Sign In To Your Account/Create Your Account",
  "Authorize Your Spotify Account",
  "Create a Playlist",
].map((step) => <Button>{step}</Button>);

const HomePage = () => {
  const userSelector = useSelector((state) => state.user.value);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    setActiveStep(userSelector.loggedIn); // if user is logged in = 1, otherwise: = 0
  }, [userSelector]);
  
  return (
    // <div style={{backgroundColor:'rgb(100,100,100,0.2)', display:'flex'}}>
      <Box sx={{ width: "80%", marginTop: "20vh", backgroundColor:'rgb(50,100,150,0.4)', padding:'10vh', borderRadius:'13vh' }}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {stepsButtons.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>
    // </div>
  );
};

export default HomePage;
