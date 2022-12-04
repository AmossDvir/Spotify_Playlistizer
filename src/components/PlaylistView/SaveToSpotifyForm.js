import React from "react";
import { useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Groups2Icon from "@mui/icons-material/Groups2";
import PersonIcon from "@mui/icons-material/Person";
import FormControl from "@mui/material/FormControl";
import { Grid, TextField } from "@mui/material";
import { Theme } from "../Theme";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  isPublicContainerStyle: {
    backgroundColor: `${Theme.palette.primary.light} !important`,
    pointerEvents: "none",
    marginLeft: "0px",
    borderRadius: "30px",
    padding: "5px",
    paddingLeft: "10px",
  },
}));

const SaveToSpotifyForm = ({
  playlistName,
  description,
  isPublic,
  setPlaylistName,
  setDescription,
  setIsPublic,
}) => {
  const classes = useStyles();
  //   const [isPublic, setIsPublic] = useState(true);
  //   const [playlistName, setPlaylistName] = useState("");
  //   const [description, setDescription] = useState("");

  const onIsPublicChange = (e) => {
    setIsPublic(e.target.checked);
  };

  const onPlaylistNameChange = (e) => {
    setPlaylistName(e.target.value);
  };

  const onDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  return (
    <FormControl>
      <Grid container>
        <Grid item sm={12}>
          <TextField
            id="outlined-basic"
            margin="normal"
            label={<div style={{ fontWeight: 300 }}>Playlist Name</div>}
            variant="outlined"
            value={playlistName}
            onChange={onPlaylistNameChange}
            fullWidth
          />
        </Grid>
        <Grid item sm={12}>
          <TextField
            id="outlined-multiline-static"
            margin="normal"
            label={<div style={{ fontWeight: 300 }}>Playlist Description</div>}
            variant="outlined"
            value={description}
            onChange={onDescriptionChange}
            fullWidth
            multiline
            rows={2}
          />
        </Grid>
        <Grid item sm={12}>
          <div style={{ margiLeft: "-100px !important" }}>
            <FormControlLabel
              style={{ margiLeft: "-16px !important" }}
              sx={{ margiLeft: "-16px !important" }}
              labelPlacement="start"
              className={classes.isPublicContainerStyle}
              control={
                <Switch
                  defaultChecked
                  style={{ pointerEvents: "auto" }}
                  checked={isPublic}
                  onChange={onIsPublicChange}
                />
              }
              label={
                <div style={{ display: "flex", fontWeight: 300 }}>
                  Make It Public?{" "}
                  {isPublic ? (
                    <Groups2Icon sx={{ marginLeft: "12px" }} />
                  ) : (
                    <PersonIcon sx={{ marginLeft: "12px" }} />
                  )}
                </div>
              }
            ></FormControlLabel>
          </div>
        </Grid>
      </Grid>
    </FormControl>
    // <div>SaveToSpotifyForm</div>
  );
};

export default SaveToSpotifyForm;
