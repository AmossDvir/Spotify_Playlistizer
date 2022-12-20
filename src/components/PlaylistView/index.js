import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { routes } from "../../constants";
import { getUserPlaylists } from "../../controllers/spotify/getUserPlaylistsController";
import { saveToSpotify } from "../../controllers/spotify/saveToSpotifyController";
import VirtualSongsList from "./SongsList/VirtualSongsList";
import DialogWindow from "../../generalComponents/DialogWindow";
import SaveToSpotifyForm from "./SaveToSpotifyForm";
import SongsList from "./SongsList";
import AnimatedText from "../../generalComponents/AnimatedText";
import Player from "../../generalComponents/Player/Player";
import PlayerProvider from "../../generalComponents/Player/PlayerProvider";
import ColoredButton from "../../generalComponents/ColoredButton";


const PlaylistView = () => {
  const userSelector = useSelector((state) => state.user.value);


  const [userPlaylists, setUserPlaylists] = useState([]);
  const [noPlaylists, setNoPlaylists] = useState(false);



  const onDeletePlaylist = async () => {
    //   axios.delete('url', { data: payload }).then(
    //     // Observe the data keyword this time. Very important
    //     // payload is the request body
    //     // Do something
    //   )
  };



  useEffect(() => {
    var userId = userSelector.userId;
    if (!userId || userId === "") {
      userId = JSON.parse(localStorage.getItem("user")).userId;
    }
    const spotifyAccessToken = localStorage.getItem(
      userSelector.userId + "spotifyAccessToken"
    );
    console.log(spotifyAccessToken);
    const fetchUserPlaylists = async (userId, spotifyAccessToken) => {
      try {
        const res = await getUserPlaylists(userId, spotifyAccessToken);
        console.log(res.data);
        // response returned empty array- User doesn't have playlists:
        if (res.data.length === 0) {
          setNoPlaylists(true);
        }
        setUserPlaylists(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    if (userId && spotifyAccessToken) {
      fetchUserPlaylists(userId, spotifyAccessToken);
    }
  }, [
    localStorage.getItem(userSelector.userId + "spotifyAccessToken"),
    localStorage.getItem("user"),
  ]);

  // useEffect(() => console.log(userPlaylists?.mostRecent), []);

  return noPlaylists ? (
    <Box mt="10vh" display="flex" justifyContent="center">
      <Typography fontWeight={400} fontSize={70}>
        No Playlists Yet, Click {<Link to={routes.create.url}>Here</Link>} to
        Create One
      </Typography>
    </Box>
  ) : userPlaylists && userPlaylists?.mostRecent ? (
    <Box
      mt="10vh"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      {/* <VirtualSongsList
        songsListData={userPlaylists.mostRecent}
      ></VirtualSongsList> */}
      <SongsList songsList={userPlaylists?.mostRecent} userPlaylists={userPlaylists}></SongsList>
      <Box mt="10vh"></Box>
      <ColoredButton
        sx={{ margin: "0 auto", marginTop: "20px" }}
        variant="contained"
        onClick={onDeletePlaylist}
      >
        Delete
      </ColoredButton>



      <PlayerProvider visible={true}></PlayerProvider>

    </Box>
  ) : (
    <AnimatedText
      textLines={[
        {
          value: "Checking for Playlists...",
          delay: 0.5,
          infinite: true,
          direction: "alternate-reverse",
          duration: 950,
        },
      ]}
    ></AnimatedText>
  );
};

export default PlaylistView;
