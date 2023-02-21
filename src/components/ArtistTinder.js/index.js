import React, { useState, useEffect, useContext } from "react";
import { Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import ArtistTinderTitle from "./ArtistTinderTitle";
import Deck from "./Deck";
import GenresSelector from "../GenresPicker/GenresSelector";
import { getAvailableGenres } from "../../controllers/spotify/getAvailableGenresController";
import "./Deck.css";
import { retrieveArtistsByGenres } from "../../controllers/spotify/retrieveArtistsByGenresController";
import { UserContext } from "../../context/UserContext";

const ArtistTinder = () => {
  const [userContext, setUserContext] = useContext(UserContext);

  const [availableGenres, setAvailableGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [artists, setArtists] = useState([]);
  const [selectedArtists, setSelectedArtists] = useState([]);
  const SpotifyAccessToken = localStorage.getItem(
    userContext?.userId + "spotifyAccessToken"
  );

const onSwipeRight = (artist) => {
  setSelectedArtists([...selectedArtists, artist]);
}

  // Fetch genres list
  useEffect(() => {
    const getGenres = async () => {
      setAvailableGenres(
        await getAvailableGenres(
          localStorage.getItem(userContext?.userId + "spotifyAccessToken")
        )
      );
    };
    getGenres();
  }, []);

  const onStartClick = async () => {
    setLoading(true);
    try {
      var response = await retrieveArtistsByGenres(
        selectedGenres,
        SpotifyAccessToken
      );
      setArtists(response.data);
      console.log(response);
      setLoading(false);
      setSuccess(true);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="main">
      <div>
        <Typography>
          <ArtistTinderTitle></ArtistTinderTitle>
        </Typography>
      </div>
      {availableGenres?.length > 0 && (
        <>
          <Typography>Choose Genres:</Typography>
          <GenresSelector
            items={availableGenres}
            setGenresList={setSelectedGenres}
          ></GenresSelector>
        </>
      )}

      {SpotifyAccessToken && (
        <div>
          {success && artists.length > 0 && <div style={{marginTop:'2vh'}}><Deck artists={artists} onSwipeRight={onSwipeRight}></Deck></div>}
          <div className="analyze-button">
            <LoadingButton
              onClick={onStartClick}
              disabled={selectedGenres.length <= 0}
              loading={loading}
              loadingIndicator={"Starting..."}
              variant="contained"
              sx={{ width: "10rem" }}
            >
              Start
            </LoadingButton>
          </div>
        </div>
      )}
    </div>
  );
};

export default ArtistTinder;
