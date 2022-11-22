import { Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const LoggedOutPanel = () => {
  return (
    <div style={{textAlign:"center", marginTop:'15vh'}}>
      <Typography fontWeight={400}>
        Only Registered Users Can Create Playlists
      </Typography>
      <Typography fontWeight={400}>
        If You Still Don't Have an Account, You May Click <Link to={"/sign_up"}>Here</Link> And Create One
      </Typography>
    </div>
  );
};

export default LoggedOutPanel;
