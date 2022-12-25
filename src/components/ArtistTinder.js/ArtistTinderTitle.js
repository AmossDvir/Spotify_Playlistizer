import React from "react";
import { toTitleCase } from "../common";
import "./ArtistTinderTitle.css";

const ArtistTinderTitle = () => {
  return (
    <div className="title">{toTitleCase("Create a playlist from your favorite artists' music")}</div>
  );
};

export default ArtistTinderTitle;
