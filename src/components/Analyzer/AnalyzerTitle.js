import React from "react";
import { toTitleCase } from "../common";
import "./AnalyzerTitle.css";

const AnalyzerTitle = () => {
  return (
    <div className="title">{toTitleCase("analyze your library and classify it to genres")}</div>
  );
};

export default AnalyzerTitle;
