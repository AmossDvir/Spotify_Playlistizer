import { Typography } from "@mui/material";
import React from "react";

export const errorCodesLabels = {
  0: "",
  401: "You have entered an invalid username or password",
  400: "User already exists",
  "ERR_NETWORK": "Network error"
};
const ErrorLabel = ({ errCode }) => {
  return (
    <Typography style={{ color: "red" }}>
      {errorCodesLabels[errCode] ?? "Unknown error"}
    </Typography>
  );
  //   return <div>{errorCodesLabels.hasOwnProperty(errCode) ? errorCodesLabels[errCode] : "Unknown error"}</div>;
};

export default ErrorLabel;
