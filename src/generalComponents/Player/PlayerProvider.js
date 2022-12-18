import React, { useCallback } from 'react';
import { useSelector } from "react-redux";
import { WebPlaybackSDK } from "react-spotify-web-playback-sdk";
import Player from './Player';

const PlayerProvider = ({ visible }) => {
    const userSelector = useSelector((state) => state.user.value);
    const getSpotifyAccessToken = () =>  localStorage.getItem(userSelector.userId + "spotifyAccessToken")
    const getOAuthToken = useCallback(callback => {
        const token = getSpotifyAccessToken();
        callback(token);
      }, []);
    return (
    <WebPlaybackSDK
      deviceName="Spotify Playlist Generator"
      getOAuthToken={getOAuthToken}
      volume={0.5}
      initialDeviceName='Spotify Playlist Generator'
      initialVolume={0.5}
      connectOnInitialized
    >
        {visible && <Player token={getSpotifyAccessToken}></Player>}
      </WebPlaybackSDK>
  );
};

export default PlayerProvider;