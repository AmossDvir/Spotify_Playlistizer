import { Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { routes } from "../constants";
import { openSpotifyWindow } from "../controllers/spotify/openSpotifyWindow";

const DisconnectedSpotifyPanel = () => {
  return (
    <div style={{textAlign:"center", marginTop:'15vh'}}>
      <Typography fontWeight={400}>
        It Seems That Your Spotify Account Isn't Connected
      </Typography>
      <Typography fontWeight={400}>
        You May Connect It <Link onClick={openSpotifyWindow}>Here</Link>
      </Typography>
    </div>
  );
};

export default DisconnectedSpotifyPanel;
