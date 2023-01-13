import React from "react";
import { styled } from "@mui/material/styles";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";

const ColoredTooltip = ({ color, bgColor, ...rest }) => {
  const ColorTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: bgColor ?? theme.palette.primary.main,
    },
  }));

  return <ColorTooltip {...rest}></ColorTooltip>;
};

export default ColoredTooltip;
