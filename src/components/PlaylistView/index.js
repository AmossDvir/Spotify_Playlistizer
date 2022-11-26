import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { routes } from "../../constants";
import { getUserPlaylists } from "../../controllers/Spotify/getUserPlaylistsController";

import VirtualSongsList from "../SongsList/VirtualSongsList";
const PlaylistView = () => {
  const [userPlaylists, setUserPlaylists] = useState([]);
  const [noPlaylists, setNoPlaylists] = useState(false);
  const userSelector = useSelector((state) => state.user.value);

  useEffect(() => {
    const fetchUserPlaylists = async () => {
      var userId = userSelector.userId;
      if (!userId || userId === "") {
        userId = JSON.parse(localStorage.getItem("user")).userId;
      }
      const res = await getUserPlaylists(userId);

      // response returned empty array- User doesn't have playlists:
      if (res.data.length === 0) {
        setNoPlaylists(true);
      }
      setUserPlaylists(res.data[0]);
    };
    fetchUserPlaylists();
    // setUserPlaylists(res);
  }, []);

  // useEffect(() => console.log(userPlaylists), [userPlaylists]);

  // const playlistsSelector = useSelector((state) => state.playlists.value) || getUserPlaylists(userSelector.userId);

  useEffect(() => console.log(userPlaylists?.mostRecent), []);

  return noPlaylists ? (
    <Box mt="10vh" display="flex" justifyContent="center">
      <Typography fontWeight={400} fontSize={70}>
        No Playlists Yet, Click {<Link to={routes.create.url}>Here</Link>} to Create One
      </Typography>
    </Box>
  ) : userPlaylists && userPlaylists?.mostRecent ? (
    <Box mt="10vh">
      <VirtualSongsList
        songsListData={userPlaylists.mostRecent}
      ></VirtualSongsList>
    </Box>
  ) : (
    <Box mt="10vh" display="flex" justifyContent="center">
      <Typography fontWeight={400} fontSize={100}>
        Checking for Playlists...
      </Typography>
    </Box>
  );
};

export default PlaylistView;
