import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { playSong, pauseSong } from "../../model/songPlaybackSlice";

const spotifyBaseURL = "https://api.spotify.com/v1/me/player/";

const usePlayerFuncs = (token, deviceId) => {
  const dispatch = useDispatch();
  const [spotifyAccessToken, setSpotifyAccessToken] = useState(token);

  useEffect(() => {
    setSpotifyAccessToken(token);
  }, [token]);

  const play = async (songsList) => {
    try {
      const res = await axios.put(
        spotifyBaseURL + "play",
        { uris: /*songsList*/ ["spotify:track:48HSUrDZQPVeWuVckLb902"] },
        {
          params: {
            device_id: deviceId,
          },
          headers: {
            Authorization: `Bearer ${spotifyAccessToken}`,
          },
        }
      );
      if (res.status === 204) {
        dispatch(playSong(songsList));
      }
      return res;
    } catch (err) {
      return err;
    }
  };

  const pause = async () => {
    try {
      const res = await axios.put(
        spotifyBaseURL + "pause",
        {},
        {
          params: {
            device_id: deviceId,
          },
          headers: {
            Authorization: `Bearer ${spotifyAccessToken}`,
          },
        }
      );
      if (res.status === 204) {
        dispatch(pauseSong());
      }
      return res;
    } catch (err) {
      return err;
    }
  };

  const previous = async () => {
    try {
      const res = await axios.post(
        spotifyBaseURL + "previous",
        {},
        {
          headers: {
            Authorization: `Bearer ${spotifyAccessToken}`,
          },
        }
      );
      return res;
    } catch (err) {
      return err;
    }
  };
  const next = async () => {
    try {
      const res = await axios.post(
        spotifyBaseURL + "next",
        {},
        {
          headers: {
            Authorization: `Bearer ${spotifyAccessToken}`,
          },
        }
      );
      return res;
    } catch (err) {
      return err;
    }
  };

  return [play, pause, previous, next];
};

export default usePlayerFuncs;
