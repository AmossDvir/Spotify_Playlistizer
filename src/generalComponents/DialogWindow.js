import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Divider } from "@mui/material";



const useStyles = makeStyles((theme) => ({
  dialogStyle: { backgroundColor:`${theme.palette.grey[100]} !important`, width: "35%", height: "55vh", maxWidth:'50%' }

}));

const DialogWindow = ({
  title,
  bodyText,
  children,
  isOpen,
  onClose,
  onCancel,
  onConfirm,
  confirmDisabled=false,
  confirmButtonText="Confirm",
  cancelButtonText="Cancel", 
  hasCancelButton = false,
  closesOnClickingOutside = false,
}) => {

  const classes = useStyles();


  const onConfirmButtonClicked = () => {
    onConfirm && onConfirm();
    onClose();
  };

  const onCancelButtonClicked = () => {
    onCancel && onCancel();
    onClose();
  };

  return (
    <>
      <Dialog
        PaperProps={{ className:classes.dialogStyle}}
        open={isOpen}
        
        {...(closesOnClickingOutside && { onClose: onClose })}
      >
        <DialogTitle color="primary"  id="max-width-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <Divider sx={{marginTop:'1vh', marginBottom:'2vh'}} />
          <DialogContentText sx={{fontWeight:400}} id="alert-dialog-description">
            {bodyText}
          </DialogContentText>
          {children}
        </DialogContent>
        <DialogActions>
          {hasCancelButton && (
            <Button onClick={onCancelButtonClicked} color="error">{cancelButtonText}</Button>
            )}
          <Button disabled={confirmDisabled} onClick={onConfirmButtonClicked} color="primary">
            {confirmButtonText}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
export default DialogWindow;
