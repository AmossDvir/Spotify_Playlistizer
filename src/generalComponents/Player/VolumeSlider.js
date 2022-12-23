import React, { useState, useEffect, useRef, useCallback } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Slider from "@mui/material/Slider";
import VolumeUp from "@mui/icons-material/VolumeUp";
import { IconButton } from "@mui/material";
import VolumeDown from "@mui/icons-material/VolumeDown";
import VolumeMuteIcon from "@mui/icons-material/VolumeMute";
import "./VolumeSlider.css"

const VolumeSlider = ({ onVolumeChange, defaultValue = 50 }) => {
  const sliderRef = useRef(null);
  const [value, setValue] = useState(defaultValue);
  const [MIN_VOLUME, MAX_VOLUME] = [0, 100];
  const [valueBeforeMute, setValueBeforeMute] = useState(defaultValue);

  useEffect(() => {
    const onWheelEvent = (e) => onChange(null, value - e.deltaY * 0.1);

    if (sliderRef.current) {
      sliderRef.current.addEventListener("wheel", onWheelEvent, {
        passive: true,
      });
      return () => {
        sliderRef?.current &&
          sliderRef.current.removeEventListener("wheel", onWheelEvent);
      };
    }
  });

  useEffect(() => {
    onVolumeChange(value / 100);
  }, [value]);

  const onChange = (e, newValue) => {
    const volume =
      newValue > MAX_VOLUME
        ? MAX_VOLUME
        : newValue < MIN_VOLUME
        ? MIN_VOLUME
        : newValue;
    setValue(Math.round(volume * 10) / 10);
  };

  const VolumeIcon = () => (
    <IconButton disableRipple sx={{cursor:'default'}}
      onClick={() => {
        if (value === MIN_VOLUME) {
          setValue(valueBeforeMute);
        } else {
          setValueBeforeMute(value);
          setValue(0);
        }
      }}
    >
      {value > 30 ? (
        <VolumeUp color="primary" />
      ) : value ? (
        <VolumeDown color="primary" />
      ) : (
        <VolumeMuteIcon color="primary" />
      )}
    </IconButton>
  );

  return (
    <Box sx={{ width: 200 }}>
      <Stack spacing={2} direction="row" alignItems="center">
        <VolumeIcon></VolumeIcon>
        <Slider
        disableSwap
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
