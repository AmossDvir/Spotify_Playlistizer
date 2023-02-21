import React, { useState } from "react";
import { IconButton } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import RepeatIcon from "@mui/icons-material/Repeat";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import "./PlayerControlButtons.css";
import {
  usePlaybackState,
  usePlayerDevice,
  useSpotifyPlayer,
} from "react-spotify-web-playback-sdk";

const PlayerControlButtons = ({ songsList }) => {
  const playbackState = usePlaybackState(true, 500);
  const player = useSpotifyPlayer();

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

  return player ? (
    <div>
      <IconButton // Shuffle button
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
      <IconButton // Previous button
        disableRipple
        color="neutral"
        sx={{ ...generalStyleProps, "&:hover": { color: "neutral.light" } }}
        onClick={() => player.nextTrack()}
      >
        <SkipPreviousIcon></SkipPreviousIcon>
      </IconButton>
      <IconButton // Play button
        disableRipple
        color="primary"
        sx={{
          ...generalStyleProps,
          borderRadius: 100,
          width: "45px",
          color: "black",
          backgroundColor: "neutral.main",
          "&:hover": { backgroundColor: "neutral.light" },
        }}
        onClick={
          playbackState?.paused ? () => player.resume() : () => player.pause()
        }
      >
        {playbackState?.paused ? (
          <PlayArrowIcon></PlayArrowIcon>
        ) : (
          <PauseIcon></PauseIcon>
        )}
      </IconButton>
      <IconButton // Next button
        disableRipple
        color="neutral"
        sx={{ ...generalStyleProps, "&:hover": { color: "neutral.light" } }}
        onClick={() => player.nextTrack()}
      >
        <SkipNextIcon></SkipNextIcon>
      </IconButton>

      <IconButton // Repeat button
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
  ) : (
    <div></div>
  );
};

export default PlayerControlButtons;
