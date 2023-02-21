import React, { useEffect, useState, useRef, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import PlayerControlButtons from "./PlayerControlButtons";
import SongTitle from "../../components/PlaylistView/SongsList/SongTitle";
import "./Player.css";
import {
  useWebPlaybackSDKReady,
  usePlaybackState,
  useSpotifyPlayer,
  usePlayerDevice,
} from "react-spotify-web-playback-sdk";
import { motion } from "framer-motion";
import { convertArtistsArrayToString } from "../../components/common";
import VolumeSlider from "./VolumeSlider";
import { getSongLiked } from "../../controllers/spotify/getSongLiked";
import playSong from "../../controllers/spotify/playSongController";
import { playSong as updateSongInStore } from "../../model/songPlaybackSlice";
import { UserContext } from "../../context/UserContext";

const calculateBarPosition = (position, overall) => {
  return (position / overall) * 100;
};

const Player = ({ token }) => {
  const [userContext, setUserContext] = useContext(UserContext);

  const dispatch = useDispatch();
  const webPlaybackSDKReady = useWebPlaybackSDKReady();
  const player = useSpotifyPlayer();
  const barRef = useRef(null);
  const device = usePlayerDevice();
  const playerSelector = useSelector((state) => state.songPlayback.value);
  const [isLiked, setIsLiked] = useState(false);
  const [barWidth, setBarWidth] = useState(0);
  const [isPressingBar, setIsPressingBar] = useState(false);
  const playbackState = usePlaybackState(true, 500);

  document.addEventListener("mouseup", (e) => {
    if (barRef.current && !barRef.current.contains(e.target)) {
      setIsPressingBar(false);
    }
  });

  useEffect(() => {
    if (device && playbackState?.track_window?.current_track?.id) {
      
      const getLiked = async () => setIsLiked(await getSongLiked(
          localStorage.getItem(userContext?.userId + "spotifyAccessToken"),
          playbackState?.track_window?.current_track?.id
        ));
      getLiked();
      dispatch(updateSongInStore({...playbackState?.track_window?.current_track, liked:isLiked}))
    }
  }, [playbackState?.track_window?.current_track?.id]);

  useEffect(() => {
    if(playerSelector?.isPlaying){
      playSong(localStorage.getItem(userContext?.userId + "spotifyAccessToken"), device, playerSelector.song);
    }
  }, [playerSelector?.song, device, userContext?.userId]);

  useEffect(() => {
    if (playbackState && !isPressingBar) {
      setBarWidth(
        calculateBarPosition(playbackState.position, playbackState.duration) +
          "%"
      );
    }
  }, [isPressingBar, playbackState?.position, playbackState?.duration]);

  const onBarClick = (e) => {
    e.preventDefault();
    setIsPressingBar(true);
    if (player && playbackState?.track_window?.current_track) {
      const bounds = e.target.getBoundingClientRect();
      const position = e.clientX - bounds.left;
      const positionPercent = calculateBarPosition(
        position,
        barRef.current.offsetWidth
      );
      player.seek((positionPercent / 100) * playbackState.duration);
      setBarWidth(positionPercent + "%");
    }
  };

  const onBarMove = (e) => {
    if (isPressingBar) {
      onBarClick(e);
    }
  };

  return (
    <div className="player">
      {webPlaybackSDKReady && device ? (
        <div>
          <div className="progress-bar">
            <motion.div
              whileHover={{
                scaleY: 2.2,
                transition: { duration: 0.15 },
              }}
              className="progress-bar-back"
              onMouseDown={onBarClick}
              onMouseMove={onBarMove}
              onMouseUp={() => setIsPressingBar(false)}
              ref={barRef}
            >
              {playbackState && (
                <motion.div
                  whileHover={{
                    // scaleY: 2.2,
                    transition: { duration: 0.8 },
                  }}
                  style={{
                    width: barWidth,
                    height: "inherit",
                    backgroundColor: "#9C27B0",
                  }}
                ></motion.div>
              )}
            </motion.div>
          </div>
          {playbackState?.track_window?.current_track && (
            <div style={{ position: "fixed", paddingTop: "0px" }}>
              <SongTitle
                songId={playbackState.track_window.current_track.id}
                songArtists={convertArtistsArrayToString(
                  playbackState.track_window.current_track.artists
                )}
                image={
                  playbackState.track_window.current_track.album.images[1].url
                }
                songName={playbackState.track_window.current_track.name}
                liked={isLiked}
                small
              ></SongTitle>
            </div>
          )}
          <div className="back">
            <div>
              <div className="song-details">
                <PlayerControlButtons
                  songsList={["spotify:track:48HSUrDZQPVeWuVckLb902"]}
                ></PlayerControlButtons>
              </div>
            </div>
            <div style={{ position: "fixed", right: "0vw" }}>
              <VolumeSlider onVolumeChange={(volume) => {player.setVolume(volume)}}></VolumeSlider>
            </div>
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default Player;
