import React, { useState, createRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPlaylist } from "../../model/playlistsSlice";
import DraggableKnob from "./DraggableKnob";
import "./GenresPicker.css";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { purple } from "@mui/material/colors";
import Grid from "@mui/material/Grid";
import { Box, ListItem, TextField, Typography } from "@mui/material";
import GenresList from "./GenresList";
import { generatePlaylist } from "../../controllers/spotify/generatePlaylistController";
import { savePlaylist } from "../../controllers/spotify/savePlaylistController";
import { getAvailableGenres } from "../../controllers/spotify/getAvailableGenresController";
import LoadingButton from "../../generalComponents/LoadingButton";
import GenresSelector from "./GenresSelector";


  const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(purple[500]),
    display: "flex",
    backgroundColor: purple[500],
    "&:hover": {
      backgroundColor: purple[700],
    },
  }));


const GenresPicker = () => {
  const dispatch = useDispatch();
  const userSelector = useSelector((state) => state.user.value);


  const size = 75;
  const panelRef = createRef();
  const [bgColor, setBgColor] = useState("rgb(100,150,150)");
  const [position, setPosition] = useState();
  const [genresList, setGenresList] = useState([]);
  const [genre, setGenre] = useState();
  const [availableGenres, setAvailableGenres] = useState([]);
  const [creationErr, setCreationErr] = useState(false);
  const [creationSuccess, setCreationSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const onCreatePlaylist = async () => {
    setLoading(true);
    try {
      // console.log(genresList);
      const result = await generatePlaylist(
        genresList ?? [""],
        localStorage.getItem(userSelector.userId + "spotifyAccessToken")
      );
      dispatch(addPlaylist(result.data));
      await savePlaylist(result.data, userSelector.userId);
      setCreationSuccess(true);
      setCreationErr(false);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setCreationErr(true);
      setCreationSuccess(false);
    }
  };

  useEffect(() => console.log(genresList), [genresList]);

  // const onAddGenre = () => {
  //   if (genresList.length === 0) {
  //     genre && setGenresList([genre]);
  //   } else {
  //     genre && setGenresList([...genresList, genre]);
  //   }
  // };

  // const handleMovement = (e, position) => {
  //   setBgColor(
  //     `rgb(${(position.y / panelRef.current.offsetHeight) * 255},${Math.abs(
  //       (position.x / panelRef.current.offsetWidth) * 255
  //     )},${Math.abs(
  //       255 -
  //         ((position.y + position.x) /
  //           (panelRef.current.offsetWidth + panelRef.current.offsetHeight)) *
  //           255
  //     )})`
  //   );
  // };
  
  useEffect(() => {
    const getGenres = async () => {
      setAvailableGenres(
        await getAvailableGenres(
          localStorage.getItem(userSelector.userId + "spotifyAccessToken")
        )
      );
    };
    getGenres();

    // setPosition({
    //   x: panelRef.current.offsetWidth / 2 - size / 2,
    //   y: panelRef.current.offsetHeight / 2 - size / 2,
    // });
  }, []);

  useEffect(() => setButtonDisabled(!genresList || !(genresList.length > 0)), [genresList]);
  return (
    // <Grid
    //   style={{ margin:'0 auto',  }}
    //   container
    //   display="flex"
    //   justifyContent="center"
    //   alignItems="center"
    //   spacing={2}
    // >
    <Box sx={{ flexDirection: 'column' }} display="flex" justifyContent="center" alignItems="center">
      {/* <Grid item xs={12}> */}
            {availableGenres?.length > 0 && <GenresSelector setGenresList={setGenresList} items={availableGenres}></GenresSelector>}
          {/* </Grid> */}
      {/* <Grid item xs={4} md={2}> */}
        {/* <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography margin={"50px"} sx={{ fontWeight: 400 }}>
              Drag & drop genres onto the panel
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
            ></TextField>
          </Grid>

          <Grid item xs={12}>
            <ColorButton variant="contained" onClick={onAddGenre}>
              Add Genre
            </ColorButton>
          </Grid>

        </Grid> */}
      {/* </Grid> */}
      {/* <Grid item xs={8} md={10}>
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
      </Grid> */}
      {/* <Grid item xs={12}> */}
        <Box display="flex" justifyContent="center" mt={10}>
        <LoadingButton label="Create Playlist" loading={loading} onClick={onCreatePlaylist} disabled={buttonDisabled}></LoadingButton>
          {/* <ColorButton variant="contained" onClick={onCreatePlaylist}>
            Create Playlist
          </ColorButton> */}
        </Box>
      {/* </Grid> */}
      {creationSuccess && (
        <Typography sx={{ fontWeight: 400 }}>
          Playlist Created Successfully
        </Typography>
      )}
      {creationErr &&
        (genresList ? (
          <Typography sx={{ fontWeight: 400 }}>
            Failed to Create Playlist
          </Typography>
        ) : (
          <Typography sx={{ fontWeight: 400 }}>
            Please Enter at Least 1 Genre
          </Typography>
        ))}
    {/* </Grid> */}
    </Box>
  );
};

export default GenresPicker;
