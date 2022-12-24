import React, { useState } from "react";
import { useSelector } from "react-redux";
import AnalyzerTitle from "./AnalyzerTitle";
import "./Analyzer.css";
import { Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import analyzeLibrary from "../../controllers/spotify/analyzeLibraryController";
import CakeChart from "./CakeChart";
import { useEffect } from "react";

const Analyzer = () => {
    const userSelector = useSelector((state) => state.user.value);
    const SpotifyAccessToken = localStorage.getItem(userSelector.userId + "spotifyAccessToken")
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [genresSegmentation, setGenresSegmentation] = useState();

  const onAnalyzeClick = async () => {
    setLoading(true);
    try{
    var classification = await analyzeLibrary(SpotifyAccessToken);
    classification = classification.data;
    console.log(classification.genres_segmentation_normalized)
    setGenresSegmentation(classification.genres_segmentation_normalized);
    setLoading(false);
    setSuccess(true);
    }
    catch(err){
      console.error(err);
    }
  };

  useEffect(() => console.log(genresSegmentation), [genresSegmentation]);

  return (
    <div className="main">
      <div>
        <Typography>
          <AnalyzerTitle></AnalyzerTitle>
        </Typography>
      </div>
      {SpotifyAccessToken && <div className="analyze-button">
        <LoadingButton

          onClick={onAnalyzeClick}
          loading={loading}
          loadingIndicator={"Analyzing..."}
          variant="contained"
          sx={{width:"10rem"}}
        >Analyze</LoadingButton>

      </div>}
      {success && genresSegmentation && <div className="cake-chart-area"><CakeChart data={genresSegmentation}></CakeChart></div>}
    </div>
  );
};

export default Analyzer;
