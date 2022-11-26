import React, { useState, createRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPlaylist } from "../../model/playlistsSlice";
import DraggableKnob from "./DraggableKnob";
import "./GenresPicker.css";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { purple } from "@mui/material/colors";
import Grid from "@mui/material/Grid";
import { Box, Typography } from "@mui/material";
import GenresList from "./GenresList";
import { generatePlaylist } from "../../controllers/Spotify/generatePlaylistController";
import SongsList from "../SongsList";
import { savePlaylist } from "../../controllers/Spotify/savePlaylistController";

const GenresPicker = () => {
  const dispatch = useDispatch();
  const userSelector = useSelector((state) => state.user.value);
  const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(purple[500]),
    display: "flex",
    backgroundColor: purple[500],
    "&:hover": {
      backgroundColor: purple[700],
    },
  }));

  const size = 75;
  const panelRef = createRef();
  const [bgColor, setBgColor] = useState("rgb(100,150,150)");
  const [position, setPosition] = useState();

  const onCreatePlaylist = async () => {
    const result = await generatePlaylist(
      ["Pop"],
      localStorage.getItem(userSelector.userId + "spotifyAccessToken")
    );
    dispatch(addPlaylist(result.data));
    savePlaylist(result.data, userSelector.userId);
  };

  const handleMovement = (e, position) => {
    setBgColor(
      `rgb(${(position.y / panelRef.current.offsetHeight) * 255},${Math.abs(
        (position.x / panelRef.current.offsetWidth) * 255
      )},${Math.abs(
        255 -
          ((position.y + position.x) /
            (panelRef.current.offsetWidth + panelRef.current.offsetHeight)) *
            255
      )})`
    );
  };
  useEffect(
    () =>
      setPosition({
        x: panelRef.current.offsetWidth / 2 - size / 2,
        y: panelRef.current.offsetHeight / 2 - size / 2,
      }),
    []
  );
  return (
    <Grid
      style={{ marginLeft: "100px", marginRight: "200px" }}
      container
      justifyContent="center"
      alignItems="center"
      spacing={2}
    >
      <Grid item xs={4} md={2}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography margin={"50px"}>
              Drag & drop genres onto the panel
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <GenresList></GenresList>
          </Grid>
          <Grid item xs={12}>
            <ColorButton variant="contained" onClick={onCreatePlaylist}>
              Add Genre
            </ColorButton>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={8} md={10}>
        <Box display="flex" justifyContent="flex-end" sx={{ flexGrow: 1 }}>
          <div
            className="panel"
            ref={panelRef}
            style={{
              backgroundColor: bgColor,
              position: "relative",
              overflow: "auto",
              padding: "0",
            }}
          >
            {position && (
              <DraggableKnob
                defaultPosition={position}
                handleMovement={handleMovement}
                knobSize={size}
              ></DraggableKnob>
            )}
          </div>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Box display="flex" justifyContent="center">
          <ColorButton variant="contained" onClick={onCreatePlaylist}>
            Create Playlist
          </ColorButton>
        </Box>
      </Grid>
      {/* {playlist && <Grid container justifyContent="center" alignItems="center">
      <Grid item xs={4} md={4}>
<SongsList songsListData={playlist}></SongsList>
      </Grid>
      </Grid>} */}
    </Grid>
  );
};

export default GenresPicker;
