import React from "react";
import { LoadingButton as LoadingButtonMui } from "@mui/lab";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const LoadingButton = ({
  label,
  onClick,
  loading = false,
  loadingIcon = <ArrowForwardIosIcon />,
  sx,
  ...rest
}) => {
  return (
    <LoadingButtonMui
      color="primary"
      {...(onClick ? { onClick } : {})}
      endIcon={loadingIcon}
      loading={loading}
      loadingPosition="end"
      variant="contained"
      type="submit"
      sx={{ ...sx, mt: 3, mb: 3 }}
      {...rest}
    >
      {!loading && label}
    </LoadingButtonMui>
  );
};
export default LoadingButton;
