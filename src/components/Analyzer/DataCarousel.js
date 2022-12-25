import React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MobileStepper from "@mui/material/MobileStepper";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import SwipeableViews from "react-swipeable-views";
import CakeChart from "./CakeChart";
import TopArtists from "./TopArtists";

const DataCarousel = ({ genresSegmentation, artists, summaries }) => {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const componentsToRender = [
    {
      comp: <CakeChart data={genresSegmentation}></CakeChart>,
      title: "Your Favorite Genres",
    },
    {
      comp: (
        <div>
          <TopArtists artists={artists} summaries={summaries}></TopArtists>
        </div>
      ),
      title: "Your Top 10 Artists",
    },
  ];
  const maxSteps = componentsToRender.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return (
    <Box sx={{ width:'85vw', maxWidth: "85vw", flexGrow: 1 }}>
      <Paper
        square
        elevation={0}
        sx={{
          display: "flex",
          alignItems: "center",
          height: 50,
          pl: 2,
          bgcolor: "background.default",
          justifyContent: "center",
          backgroundColor:'rgb(100,100,100,0.2)'
        }}
      >
        <Typography sx={{ textAlign: "center", }}>
          {componentsToRender[activeStep].title}
        </Typography>
      </Paper>
      <SwipeableViews
        containerStyle={{ height: '60vh', WebkitOverflowScrolling: "touch" }}
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {componentsToRender.map((step, index) => (
          <div key={index}>
            {Math.abs(activeStep - index) <= 2 ? (
              <Box
                draggable={false}
                sx={{
                  backgroundColor: "rgb(100,100,100,0.2)",
                  overflow: "hidden",
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                {step.comp}
              </Box>
            ) : null}
          </div>
        ))}
      </SwipeableViews>
      <MobileStepper
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        style={{ backgroundColor: "rgb(100,100,100,0.2)" }}
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
          >
            Next
            {theme.direction === "rtl" ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === "rtl" ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
            Back
          </Button>
        }
      />
    </Box>
  );
};

export default DataCarousel;
