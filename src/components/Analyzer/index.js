import React, { useState } from "react";
import { useSelector } from "react-redux";
import AnalyzerTitle from "./AnalyzerTitle";
import "./Analyzer.css";
import { Box, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import analyzeLibrary from "../../controllers/spotify/analyzeLibraryController";
import CakeChart from "./CakeChart";
import { useEffect } from "react";
import TopArtists from "./TopArtists";
import DataCarousel from "./DataCarousel";
import getArtistsInfo from "../../controllers/lastFm/getArtistsInfoController";

const Analyzer = () => {
  const userSelector = useSelector((state) => state.user.value);
  const SpotifyAccessToken = localStorage.getItem(
    userSelector.userId + "spotifyAccessToken"
  );
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [genresSegmentation, setGenresSegmentation] = useState();
  const [artists, setArtists] = useState();
  const [summaries, setSummaries] = useState();

  const onAnalyzeClick = async () => {
    setLoading(true);
    try {
      var classification = await analyzeLibrary(SpotifyAccessToken);
      classification = classification.data;
      setGenresSegmentation(classification.genres_segmentation);
      setArtists(classification.artists);
      var info = await getArtistsInfo(
        classification.artists.slice(0, 10).map((artist) => artist.name)
      );
      setSummaries(info);
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
          <AnalyzerTitle></AnalyzerTitle>
        </Typography>
      </div>
      {success && genresSegmentation && !loading && artists && summaries && (
        <Box>
          <DataCarousel
            artists={artists.slice(0, 10)}
            genresSegmentation={genresSegmentation}
            summaries={summaries}
          ></DataCarousel>
        </Box>
      )}

      {SpotifyAccessToken && (
        <div className="analyze-button">
          <LoadingButton
            onClick={onAnalyzeClick}
            loading={loading}
            loadingIndicator={"Analyzing..."}
            variant="contained"
            sx={{ width: "10rem" }}
          >
            Analyze
          </LoadingButton>
        </div>
      )}
    </div>
  );
};

export default Analyzer;
