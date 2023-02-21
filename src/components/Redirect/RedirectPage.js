import { Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import useSpotifyAuth from "../../controllers/spotify/useSpotifyAuth";
import AnimatedText from "../../generalComponents/AnimatedText";

const code = new URLSearchParams(window.location.search).get("code");
const RedirectPage = ({ userId }) => {
  const [valid, setValid] = useState(false);

  var spotifyAccessToken = useSpotifyAuth(code);
  if (userId && spotifyAccessToken) {
    localStorage.setItem(userId + "spotifyAccessToken", spotifyAccessToken);
  }


  useEffect(() => {
    var validTimeout, keepingAliveTimeout;
    if (valid) {
      validTimeout = setTimeout(() => window.close(), 4000);
    }
    else{
      keepingAliveTimeout = setTimeout(() => window.close(), 40000);
    }
    return () => {clearTimeout(keepingAliveTimeout); clearTimeout(validTimeout) }
  }, [valid]);

  useEffect(() => {
    if (localStorage.getItem(userId + "spotifyAccessToken")) {
      setValid(true);
    }
  }, [localStorage.getItem(userId + "spotifyAccessToken")]);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography
        id="redirectText"
        sx={{ marginTop: 10, fontSize: 35, fontWeight: 400 }}
      >
        <AnimatedText
          textLines={[
            {
              value: "Your Page is Being Redirected...",
              delay: 0.5,
              infinite: true,
              direction: "alternate-reverse",
              duration: 950,
            },
          ]}
        ></AnimatedText>
      </Typography>
    </div>
  );
};

export default RedirectPage;
