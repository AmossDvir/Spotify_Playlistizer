import React, { forwardRef } from "react";
import Snackbar from "@mui/material/Snackbar";
import { Slide } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import ClickAwayListener from "@mui/base/ClickAwayListener";

const ErrorSnackBar = ({ open, onClose, promptStr }) => {
  const Alert = forwardRef((props, ref) => (
    <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
  ));

  return (
    // <ClickAwayListener>
    <Snackbar
      autoHideDuration={6000}
      open={open}
      onClose={onClose}
      TransitionComponent={(props) => <Slide {...props} direction="up" />}
    >
      <Alert severity="error">
        <div style={{ cursor: "default" }}>{promptStr}</div>
      </Alert>
    </Snackbar>
    // </ClickAwayListener>
  );
};

export default ErrorSnackBar;
