import { Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import useSpotifyAuth from "../../controllers/spotify/useSpotifyAuth";

const code = new URLSearchParams(window.location.search).get("code");
const RedirectPage = ( { userId } ) => {
  // Use '.'  '..'  '...' animation:
  const [dotsNum, setDotsNum] = useState(0);
  const [isIncrementing, setIsIncrementing] = useState(true);
  // try{

  // }
  var spotifyAccessToken = useSpotifyAuth(code);
  console.log(spotifyAccessToken);
  userId && localStorage.setItem(userId + "spotifyAccessToken", spotifyAccessToken);
  useEffect(() => {
    const dotsInterval = setInterval(() => {
      if (dotsNum === 6) {
        setIsIncrementing(false);
      }
      if (dotsNum === 1) {
        setIsIncrementing(true);
      }
      if (dotsNum < 0) {
        setDotsNum(0);
      }
      setDotsNum(isIncrementing && dotsNum < 6 ? dotsNum + 1 : dotsNum - 1);
    }, 220);
    return () => clearInterval(dotsInterval);
  });

  useEffect(() => {
    if (localStorage.getItem(userId + "spotifyAccessToken")) {
      setTimeout(() => window.close(), 40000);
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
        sx={{ marginTop: 50, fontSize: 35, fontWeight: 400 }}
      >
        Your Page is Being Redirected
        {".".repeat(dotsNum) + " .".repeat(6 - dotsNum)}
        {Array(dotsNum)
          .fill(dotsNum)
          .map((_, index) => (
            <span key={index}>&nbsp;</span>
          ))}
      </Typography>
    </div>
  );
};

export default RedirectPage;
