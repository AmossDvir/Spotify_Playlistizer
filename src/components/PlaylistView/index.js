import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { purple } from "@mui/material/colors";
import { routes } from "../../constants";
import { getUserPlaylists } from "../../controllers/spotify/getUserPlaylistsController";
import { saveToSpotify } from "../../controllers/spotify/saveToSpotifyController";
import VirtualSongsList from "./SongsList/VirtualSongsList";
import DialogWindow from "../../generalComponents/DialogWindow";
import SaveToSpotifyForm from "./SaveToSpotifyForm";
import SongsList from "./SongsList";
import AnimatedText from "../../generalComponents/AnimatedText";

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(purple[500]),
  display: "flex",
  backgroundColor: purple[500],
  "&:hover": {
    backgroundColor: purple[700],
  },
}));

const PlaylistView = () => {
  const userSelector = useSelector((state) => state.user.value);

  const [playlistName, setPlaylistName] = useState("");
  const [description, setDescription] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const [userPlaylists, setUserPlaylists] = useState([]);
  const [noPlaylists, setNoPlaylists] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const onSaveToSpotify = () => {
    setDialogOpen(true);
  };

  const onDeletePlaylist = async () => {
  //   axios.delete('url', { data: payload }).then(
  //     // Observe the data keyword this time. Very important
  //     // payload is the request body
  //     // Do something
  //   )
  }

  const onCloseDialog = () => {
    setDialogOpen(false);
  };

  const onConfirmDialog = () => {
    if (userPlaylists && userPlaylists?.mostRecent) {
      saveToSpotify(
        playlistName,
        description,
        isPublic,
        userPlaylists,
        localStorage.getItem(userSelector.userId + "spotifyAccessToken")
      );
    }
  };

  useEffect(() => {
    const fetchUserPlaylists = async () => {
      var userId = userSelector.userId;
      if (!userId || userId === "") {
        userId = JSON.parse(localStorage.getItem("user")).userId;
      }
      try {
        const res = await getUserPlaylists(userId);
        // response returned empty array- User doesn't have playlists:
        if (res.data.length === 0) {
          setNoPlaylists(true);
        }
        setUserPlaylists(res.data[0]);
        console.log(res.data[0]);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUserPlaylists();
  }, []);

  useEffect(() => console.log(userPlaylists?.mostRecent), []);

  return noPlaylists ? (
    <Box mt="10vh" display="flex" justifyContent="center">
      <Typography fontWeight={400} fontSize={70}>
        No Playlists Yet, Click {<Link to={routes.create.url}>Here</Link>} to
        Create One
      </Typography>
    </Box>
  ) : userPlaylists && userPlaylists?.mostRecent ? (
    <Box mt="10vh" display='flex' flexDirection="column" alignItems="center" justifyContent="center">
      {/* <VirtualSongsList
        songsListData={userPlaylists.mostRecent}
      ></VirtualSongsList> */}
      <SongsList songsList={userPlaylists?.mostRecent}></SongsList>
      <Box mt="10vh"></Box>
      <ColorButton
        sx={{ margin: "0 auto", marginTop:'20px' }}
        variant="contained"
        onClick={onSaveToSpotify}
      >
        Save To Spotify
      </ColorButton>
      <ColorButton
        sx={{ margin: "0 auto", marginTop:'20px'  }}
        variant="contained"
        onClick={onDeletePlaylist}
      >
        Delete
      </ColorButton>
      <DialogWindow
        title="Playlist Properties"
        bodyText="The Playlist Will Contain The Following Properties:"
        isOpen={dialogOpen}
        onClose={onCloseDialog}
        hasCancelButton
        onConfirm={onConfirmDialog}
      >
        <SaveToSpotifyForm
          playlistName={playlistName}
          description={description}
          isPublic={isPublic}
          setPlaylistName={setPlaylistName}
          setDescription={setDescription}
          setIsPublic={setIsPublic}
        ></SaveToSpotifyForm>
      </DialogWindow>
    </Box>
  ) : (
    // <Box mt="10vh" display="flex" justifyContent="center">
    //   <Typography fontWeight={400} fontSize={100}>
    //     Checking for Playlists...
    //   </Typography>
    // </Box>
    <AnimatedText textLines={[{value:"Checking for Playlists...", delay:0.5, infinite:true, direction:'alternate-reverse', duration:950}]}></AnimatedText>
  );
};

export default PlaylistView;
