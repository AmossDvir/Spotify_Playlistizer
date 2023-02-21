import React, { useCallback, useContext } from 'react';
import { WebPlaybackSDK } from "react-spotify-web-playback-sdk";
import { UserContext } from '../../context/UserContext';
import Player from './Player';

const PlayerProvider = ({ visible }) => {
    const [userContext, setUserContext] = useContext(UserContext);

    const getSpotifyAccessToken = () =>  localStorage.getItem(userContext?.userId + "spotifyAccessToken")
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