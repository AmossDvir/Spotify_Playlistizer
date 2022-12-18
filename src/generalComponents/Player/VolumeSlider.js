import React, { useState } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Slider from "@mui/material/Slider";
import VolumeUp from "@mui/icons-material/VolumeUp";
import VolumeDown from "@mui/icons-material/VolumeDown";
import VolumeMuteIcon from '@mui/icons-material/VolumeMute';

const VolumeSlider = ({ onVolumeChange }) => {
  const [value, setValue] = useState(50);

  const onChange = (e, newValue) => {
    onVolumeChange(newValue);
    setValue(newValue);
  };

  const VolumeIcon = () => value > 30 ? <VolumeUp color="primary" /> : value ? <VolumeDown color="primary" />:<VolumeMuteIcon color="primary" />
  

  return (
    <Box sx={{ width: 200 }}>
      <Stack spacing={2} direction="row" alignItems="center">
        <VolumeIcon></VolumeIcon>
        <Slider aria-label="Volume" value={value} onChange={onChange} size="small" sx={{width:'100px'}} />
      </Stack>
    </Box>
  );
};

export default VolumeSlider;
