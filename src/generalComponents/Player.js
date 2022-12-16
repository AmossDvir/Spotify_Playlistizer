import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import SpotifyPlayer from "react-spotify-web-playback";
import { motion } from "framer-motion";
import { pauseSong, playSong } from "../model/songPlaybackSlice";

const Player = () => {
  const dispatch = useDispatch();

  const playerSelector = useSelector((state) => state.songPlayback.value);
  const userSelector = useSelector((state) => state.user.value);
  const spotifyAccessToken = localStorage.getItem(
    userSelector.userId + "spotifyAccessToken"
  );
  const initialAnimationProps = {
    scale: 0,
  };
  const [animationProps, setAnimationProps] = useState();

  const onPlayerStateUpdate = (state) => {
    console.log(state);
    if (state.isActive) {
      if (state.isPlaying === false) {
        dispatch(pauseSong());
      } else {
        if (state.track) {
          dispatch(playSong(state.track))
        }
      }
    }
  };

  useEffect(() => {
    if (
      playerSelector.isPlaying &&
      userSelector.loggedIn &&
      spotifyAccessToken !== undefined
    ) {
      setAnimationProps({
        scale: 1,
        // scaleY: 1,
        // y: -100,
      });
    } else {
      setAnimationProps(initialAnimationProps);
    }
  }, [playerSelector.isPlaying]);

  return (
    playerSelector.isPlaying &&
    userSelector.loggedIn &&
    spotifyAccessToken !== undefined && (
      <motion.div
        animate={animationProps}
        transition={{ type: "spring", duration: 1 }}
        initial={{ scale: 0 }}
      >
        <div
          style={{
            position: "fixed",
            bottom: "0px",
            left: "0vw",
            right: "0vw",
          }}
        >
          <SpotifyPlayer
            magnifySliderOnHover
            showSaveIcon
            autoPlay
            callback={onPlayerStateUpdate}
            play={playerSelector.isPlaying}
            initialVolume={0.55}
            uris={[playerSelector.song.uri]}
            styles={{
              activeColor: "#fff",
              sliderHeight: "8px",
              sliderHandleColor: "primary",
              bgColor: "#333",
              color: "#fff",
              loaderColor: "#fff",
              sliderColor: "#1cb954",
              trackArtistColor: "#ccc",
              trackNameColor: "#fff",
            }}
            token={spotifyAccessToken}
          ></SpotifyPlayer>
        </div>
      </motion.div>
    )
  );
};

export default Player;
