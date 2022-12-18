import { Typography } from "@mui/material";
import React from "react";
import { errorCodesLabels } from "../constants";

const ErrorLabel = ({ errCode }) => {
  return (
    <Typography style={{ color: "red" }}>
      {errorCodesLabels[errCode] ?? "Unknown error"}
    </Typography>
  );
  //   return <div>{errorCodesLabels.hasOwnProperty(errCode) ? errorCodesLabels[errCode] : "Unknown error"}</div>;
};

export default ErrorLabel;
