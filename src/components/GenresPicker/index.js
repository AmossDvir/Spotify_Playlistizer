import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPlaylist } from "../../model/playlistsSlice";
import ClickAwayListener from "@mui/base/ClickAwayListener";
import "./GenresPicker.css";
import { Box, Typography } from "@mui/material";
import { generatePlaylist } from "../../controllers/spotify/generatePlaylistController";
import { savePlaylist } from "../../controllers/spotify/savePlaylistController";
import { getAvailableGenres } from "../../controllers/spotify/getAvailableGenresController";
import LoadingButton from "../../generalComponents/LoadingButton";
import GenresSelector from "./GenresSelector";
import LengthSlider from "./LengthSlider";
import SuccessSnackBar from "../../generalComponents/SuccessSnackBar";
import ErrorSnackBar from "../../generalComponents/ErrorSnackBar";
import { successCodes } from "../../constants";

const GenresPicker = ({ defaultLength = 100 }) => {
  const dispatch = useDispatch();
  const userSelector = useSelector((state) => state.user.value);

  const [genresList, setGenresList] = useState([]);
  const [availableGenres, setAvailableGenres] = useState([]);
  const [creationErr, setCreationErr] = useState(false);
  const [creationSuccess, setCreationSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [playlistLength, setPlaylistLength] = useState(defaultLength);
  const [snackBarOpen, setSnackBarOpen] = useState(false);

  const onCreatePlaylist = async () => {
    setLoading(true);
    setIsGenerating(true);

    const generateResult = await generatePlaylist(
      genresList ?? [""],
      localStorage.getItem(userSelector.userId + "spotifyAccessToken"),
      playlistLength
    );
    if (successCodes.includes(generateResult?.status)) {
      setIsGenerating(false);
      dispatch(addPlaylist(generateResult.data));
      const savingResult = await savePlaylist(
        generateResult.data,
        userSelector.userId
      );
      if (successCodes.includes(savingResult?.status)) {
        setCreationSuccess(true);
        setCreationErr(false);
        setLoading(false);
      } else {
        setCreationErr(true);
        setCreationSuccess(false);
      }
    } else {
      setCreationErr(true);
      setCreationSuccess(false);
    }
  };

  useEffect(() => setSnackBarOpen(true), [creationSuccess, creationErr]);

  useEffect(() => {
    setSnackBarOpen(false);
    const getGenres = async () => {
      setAvailableGenres(
        await getAvailableGenres(
          localStorage.getItem(userSelector.userId + "spotifyAccessToken")
        )
      );
    };
    getGenres();
  }, []);

  const reset = () => {
    setCreationErr(false);
    setCreationSuccess(false);
    setLoading(false);
    setIsGenerating(false);
  };

  useEffect(
    () => setButtonDisabled(!genresList || !(genresList.length > 0)),
    [genresList]
  );
  return (
    <ClickAwayListener onClickAway={reset}>
      <Box
        sx={{ flexDirection: "column" }}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        {availableGenres?.length > 0 && (
          <>
            <div className="title-label genres-label">
              <Typography>Which Genres?</Typography>
            </div>
            <GenresSelector
              setGenresList={setGenresList}
              items={availableGenres}
            ></GenresSelector>
            <div className="title-label">
              <Typography>How Many Songs?</Typography>
            </div>
            <LengthSlider
              playlistLength={playlistLength}
              onLengthChange={(e) => {
                console.log(e.target.value);
                setPlaylistLength(e.target.value);
              }}
            ></LengthSlider>
            <Box display="flex" justifyContent="center" mt={2}>
              <LoadingButton
                label="Create Playlist"
                loading={loading}
                onClick={onCreatePlaylist}
                disabled={buttonDisabled}
                loadingIndicator={`${
                  loading && isGenerating ? "Generating " : "Saving "
                }Playlist...`}
                fullWidth
              ></LoadingButton>
            </Box>
          </>
        )}

        {creationSuccess && (
          <SuccessSnackBar
            open={snackBarOpen}
            onClose={() => setSnackBarOpen(false)}
            promptStr="Playlist Created Successfully"
          ></SuccessSnackBar>
        )}
        {creationErr &&
          (genresList ? (
            <ErrorSnackBar
              open={snackBarOpen}
              onClose={() => setSnackBarOpen(false)}
              promptStr="Failed to Create Playlist"
            ></ErrorSnackBar>
          ) : (
            <Typography sx={{ fontWeight: 400 }}>
              Please Enter at Least 1 Genre
            </Typography>
          ))}
      </Box>
    </ClickAwayListener>
  );
};

export default GenresPicker;
