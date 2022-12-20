import React from 'react';
import { Slider } from '@mui/material';

const LengthSlider = ({ playlistLength, onLengthChange }) => {
  return (
    <Slider color="secondary" onChange={onLengthChange} min={10} value={playlistLength} max={250} sx={{width:"40vw"}} defaultValue={playlistLength} aria-label="Default" valueLabelDisplay="auto" />
  )
}

export default LengthSlider