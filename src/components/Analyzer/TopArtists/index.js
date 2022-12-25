import { Divider } from "@mui/material";
import React from "react";
import { useState, useEffect } from "react";
import Artist from "./Artist";
import "./TopArtists.css"

const TopArtists = ({ artists, summaries }) => {
  const [renderedArtists, setRenderedArtists] = useState();
  useEffect(() => {
    if (artists && artists.length > 0) {
      setRenderedArtists(
        artists.map((artist, index) => (
          <div className="card">
            <Artist artist={artist} index={index + 1} summary={summaries[index].summary}></Artist>
            {index < artists.length - 1 ? <Divider sx={{paddingTop:2}}></Divider> : <></>}
          </div>
        ))
      );
    }
  }, [artists]);

  return <div>{renderedArtists}</div>;
};

export default TopArtists;
