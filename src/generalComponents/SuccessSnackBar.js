import React, { forwardRef } from "react";
import Snackbar from "@mui/material/Snackbar";
import { Slide } from "@mui/material";
import MuiAlert from "@mui/material/Alert";

const SuccessSnackBar = ({ open, onClose, promptStr }) => {
  const Alert = forwardRef((props, ref) => (
    <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
  ));

  return (
      <Snackbar
        autoHideDuration={6000}
        open={open}
        onClose={onClose}
        TransitionComponent={(props) => <Slide {...props} direction="up" />}
      >
        <Alert severity="success">{promptStr}</Alert>
      </Snackbar>
  );
};

export default SuccessSnackBar;