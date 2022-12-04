import React from "react";
// import { LoadingButton as LoadingButtonMui } from "@mui/lab";
import { LoadingButton as LoadingButtonMui } from "@mui/lab";
import Box from "@mui/material/Box";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const LoadingButton = ({
  label,
  onClick,
  loading = false,
  loadingIcon = <ArrowForwardIosIcon />,
}) => {
  return (
      <LoadingButtonMui
      color="secondary"
        {...(onClick ? { onClick } : {})}
        endIcon={loadingIcon}
        loading={loading}
        loadingPosition="end"
        variant="contained"
        type="submit"
        fullWidth
        sx={{mt:3, mb:3}}
      >
        {label}
      </LoadingButtonMui>
  );
};
export default LoadingButton;
