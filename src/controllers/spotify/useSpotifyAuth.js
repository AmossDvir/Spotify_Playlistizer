import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { baseUrl } from "../../constants";

const useSpotifyAuth = (code) => {
  const [accessToken, setAccessToken] = useState();
  const [refreshToken, setRefreshToken] = useState();
  const [expiresIn, setExpiresIn] = useState();

  useEffect(() => {
    const requestAccess = async () => {
      try {
        const res = await axios.post(baseUrl + "spotify/connect", { code }, {withCredentials:false});
        window.history.pushState({}, null, "/");
        setAccessToken(res.data.accessToken);
        setRefreshToken(res.data.refreshToken);
        setExpiresIn(res.data.expiresIn);
      } catch (err) {
        console.log(err);
      }
    };
    requestAccess();
    const tryConnectAgain = setInterval(() => requestAccess(), 3000);
    // return clearInterval(tryConnectAgain);

  }, [code]);

  useEffect(() => {
    const requestAccess = async () => {
      try {
        const res = await axios.post(baseUrl + "spotify/refresh", {
          refreshToken,
        });
        setAccessToken(res.data.accessToken);
        setExpiresIn(res.data.expiresIn);
      } catch (err) {
        console.log(err);
      }
    };
    if (refreshToken && expiresIn) {
      const interval = setInterval(requestAccess, (expiresIn - 60) * 1000);
      return () => clearTimeout(interval);
    }
  }, [refreshToken, expiresIn]);

  return accessToken;
};

export default useSpotifyAuth;
