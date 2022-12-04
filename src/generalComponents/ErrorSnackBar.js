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
    <ClickAwayListener onClickAway={() => console.log("df")}>
      <Snackbar
        autoHideDuration={6000}
        open={open}
        on
        onClose={onClose}
        TransitionComponent={(props) => <Slide {...props} direction="up" />}
      >
        <Alert severity="error">{promptStr}</Alert>
      </Snackbar>
    </ClickAwayListener>
  );
};

export default ErrorSnackBar;
