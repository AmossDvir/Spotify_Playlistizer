import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Button, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import ArtistTinderTitle from "./ArtistTinderTitle";
import getLikedArtists from "../../controllers/spotify/getLikedArtistsController";
import "./ArtistTinder.css";

const ArtistTinder = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [frequencies, setFrequencies] = useState();
  const userSelector = useSelector((state) => state.user.value);
  const SpotifyAccessToken = localStorage.getItem(
    userSelector.userId + "spotifyAccessToken"
  );

  const onStartClick = async () => {
    setLoading(true);
    try {
      var classification = await getLikedArtists(SpotifyAccessToken);
      console.log(classification.frequencies);

      classification = classification.frequencies;
      setFrequencies(classification);
      //   var info = await getArtistsInfo(
      //     classification.artists.slice(0, 10).map((artist) => artist.name)
      //   );
      //   setSummaries(info);
      setLoading(false);
      setSuccess(true);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="main">
      <div>
        <Typography>
          <ArtistTinderTitle></ArtistTinderTitle>
        </Typography>
      </div>
      {SpotifyAccessToken && (
        <div className="analyze-button">
          <LoadingButton
            onClick={onStartClick}
            loading={loading}
            loadingIndicator={"Starting..."}
            variant="contained"
            sx={{ width: "10rem" }}
          >
            Start
          </LoadingButton>
        </div>
      )}
    </div>
  );
};

export default ArtistTinder;
