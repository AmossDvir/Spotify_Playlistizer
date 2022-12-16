import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { IconButton } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import RepeatIcon from "@mui/icons-material/Repeat";
import { pauseSong, playSong } from "../../../model/songPlaybackSlice";
import "./PlayerControlButtons.css";

const PlayerControlButtons = ({ songsList }) => {
  const dispatch = useDispatch();
  const playerSelector = useSelector((state) => state.songPlayback.value);
  const [shuffleActive, setShuffleActive] = useState(false);
  const [repeatActive, setRepeatActive] = useState(false);

  const chooseTrack = () => {
    return shuffleActive
      ? songsList[Math.floor(Math.random() * songsList.length)]
      : songsList[0];
  };

  const generalStyleProps = {
    cursor: "default",
    paddingLeft: "15px",
    paddingRight: "15px",
  };
  useEffect(() => console.log(shuffleActive), [shuffleActive]);
  const onPlayClick = () => {
    if (playerSelector.isPlaying) {
      dispatch(pauseSong());
    } else {
      if (songsList?.length > 0) {
        dispatch(playSong(chooseTrack()));
      }
    }
  };
  return (
    <div>
      <IconButton
        disableRipple
        color="primary"
        sx={{ ...generalStyleProps, "&:hover": { color: "primary.dark" } }}
        onClick={onPlayClick}
      >
        {playerSelector.isPlaying ? (
          <PauseIcon></PauseIcon>
        ) : (
          <PlayArrowIcon></PlayArrowIcon>
        )}
      </IconButton>

      <IconButton
        disableRipple
        onClick={() => setShuffleActive(!shuffleActive)}
        color={shuffleActive ? "primary" : "neutral"}
        sx={{
          ...generalStyleProps,
          "&:hover": { color: shuffleActive ? "primary.dark" : "white" },
        }}
      >
        <ShuffleIcon></ShuffleIcon>
      </IconButton>

      <IconButton
        disableRipple
        onClick={() => setRepeatActive(!repeatActive)}
        color={repeatActive ? "primary" : "neutral"}
        sx={{
          ...generalStyleProps,
          "&:hover": { color: repeatActive ? "primary.dark" : "white" },
        }}
      >
        <RepeatIcon></RepeatIcon>
      </IconButton>
    </div>
  );
};

export default PlayerControlButtons;
