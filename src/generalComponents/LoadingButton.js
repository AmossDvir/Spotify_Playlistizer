import React from "react";
// import { LoadingButton as LoadingButtonMui } from "@mui/lab";
import { LoadingButton as LoadingButtonMui } from "@mui/lab";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const LoadingButton = ({
  label,
  onClick,
  loading = false,
  loadingIcon = <ArrowForwardIosIcon />,
  ...rest
}) => {
  console.log(rest)
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
        {...rest}
      >
        {!loading && label}
      </LoadingButtonMui>
  );
};
export default LoadingButton;
