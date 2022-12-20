import React, { useState, useEffect, useRef} from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Slider from "@mui/material/Slider";
import VolumeUp from "@mui/icons-material/VolumeUp";
import VolumeDown from "@mui/icons-material/VolumeDown";
import VolumeMuteIcon from "@mui/icons-material/VolumeMute";

const VolumeSlider = ({ onVolumeChange }) => {
  const sliderRef = useRef(null);
  const [value, setValue] = useState(50);

  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.addEventListener(
        "wheel",
        (e) => {
          e.preventDefault();
          setValue(value - e.deltaY *0.1);
          // onVolumeChange(value - e.deltaY *0.1);

          // console.log(e.deltaY)
        },
        // { capture: true }
      );
    }
  });


  const onChange = (e, newValue) => {
    onVolumeChange(newValue / 100);
    setValue(newValue);
  };

  const VolumeIcon = () =>
    value > 30 ? (
      <VolumeUp color="primary" />
    ) : value ? (
      <VolumeDown color="primary" />
    ) : (
      <VolumeMuteIcon color="primary" />
    );

  return (
    <Box sx={{ width: 200 }}>
      <Stack spacing={2} direction="row" alignItems="center">
        <VolumeIcon></VolumeIcon>
        <Slider
          ref={sliderRef}
          aria-label="Volume"
          value={value}
          onChange={onChange}
          size="small"
          sx={{ width: "100px" }}
        />
      </Stack>
    </Box>
  );
};

export default VolumeSlider;
