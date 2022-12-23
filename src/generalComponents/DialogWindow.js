import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Divider } from "@mui/material";
import UseMobileWidth from "./UseMobileWidth";
import { LoadingButton } from "@mui/lab";

const DialogWindow = ({
  title,
  bodyText,
  children,
  isOpen,
  onClose,
  onCancel,
  onConfirm,
  confirmDisabled = false,
  confirmButtonText = "Confirm",
  cancelButtonText = "Cancel",
  hasCancelButton = false,
  closesOnClickingOutside = false,
  hasLoading = false,
}) => {
  const [loading, setLoading] = useState(false);
  const isMobile = UseMobileWidth();
  const useStyles = makeStyles((theme) => ({
    dialogStyle: {
      backgroundColor: `${theme.palette.grey[100]} !important`,
      width: isMobile ? "80%" : "40%",
      height: "55vh",
      maxWidth: isMobile ? "80%" : "50%",
    },
  }));

  const classes = useStyles();

  const onConfirmButtonClicked = async () => {
    if (onConfirm) {
      if (hasLoading) {
        setLoading(true);
      }
      await onConfirm();
      if (hasLoading) {
        setLoading(false);
      }
    }
  };

  const onCancelButtonClicked = () => {
    onCancel && onCancel();
    onClose();
  };

  return (
    <>
      <Dialog
        PaperProps={{ className: classes.dialogStyle }}
        open={isOpen}
        {...(closesOnClickingOutside && { onClose: onClose })}
      >
        <DialogTitle color="primary" id="max-width-dialog-title">
          {title}
        </DialogTitle>
        <DialogContent>
          <Divider sx={{ marginTop: "1vh", marginBottom: "2vh" }} />
          <DialogContentText
            sx={{ fontWeight: 400 }}
            id="alert-dialog-description"
          >
            {bodyText}
          </DialogContentText>
          {children}
        </DialogContent>
        <DialogActions sx={{paddingRight:"2em", paddingBottom:"1em"}}>
          {hasCancelButton && (
            <Button onClick={onCancelButtonClicked} color="error" variant="outlined" size="small"
            >
              {cancelButtonText}
            </Button>
          )}
          {hasLoading ? (
            <LoadingButton
              onClick={onConfirmButtonClicked}
              color="primary"
              loading={loading}
              variant="outlined"
              loadingIndicator="Saving..."
              size="small"
            >Save to Spotify
            </LoadingButton>
          ) : (
            <Button
              disabled={confirmDisabled}
              onClick={onConfirmButtonClicked}
              color="primary"
              variant="outlined"
              size="small"

            >
              {confirmButtonText}
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </>
  );
};
export default DialogWindow;
