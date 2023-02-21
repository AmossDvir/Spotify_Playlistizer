import React, { useEffect, useState, useContext } from "react";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { routes } from "../../constants";
import { getUserPlaylists } from "../../controllers/spotify/getUserPlaylistsController";
import SongsList from "./SongsList";
import AnimatedText from "../../generalComponents/AnimatedText";
import PlayerProvider from "../../generalComponents/Player/PlayerProvider";
import { UserContext } from "../../context/UserContext";

const PlaylistView = () => {
  const [userContext, setUserContext] = useContext(UserContext);

  const [userPlaylists, setUserPlaylists] = useState([]);
  const [noPlaylists, setNoPlaylists] = useState(false);

  useEffect(() => {
    var userId = userContext?.userId;

    const spotifyAccessToken = localStorage.getItem(
      userContext.userId + "spotifyAccessToken"
    );
    const fetchUserPlaylists = async (userId, spotifyAccessToken) => {
      try {
        const res = await getUserPlaylists(userId, spotifyAccessToken);
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
    localStorage.getItem(userContext.userId + "spotifyAccessToken"),
  ]);

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
      <SongsList
        songsList={userPlaylists?.mostRecent}
        userPlaylists={userPlaylists}
      ></SongsList>
      <Box mt="10vh"></Box>
      {/* <ColoredButton
        sx={{ margin: "0 auto", marginTop: "20px" }}
        variant="contained"
        onClick={() => {}}
      >
        Delete
      </ColoredButton> */}

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
