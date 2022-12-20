import React from "react";
import { styled } from "@mui/material/styles";
import { purple } from "@mui/material/colors";
import Button from "@mui/material/Button";

const ColoredButton = ({ color, bgColor, bgHoverColor, ...rest }) => {


  const ColorButton = styled(Button)(({ theme }) => ({
    color: color ?? theme.palette.getContrastText(purple[500]),
    display: "flex",
    backgroundColor:bgColor?? purple[500],
    "&:hover": {
      backgroundColor:bgHoverColor?? purple[700],
    },
  }));


  return <ColorButton {...rest} ></ColorButton>;
};

export default ColoredButton;
