import React, { useEffect, useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import { Avatar } from "@mui/material";
import musicIcon from "../../resources/music.svg";
const PlaylistView = ({ songs }) => {
  const [renderedSongs, setRenderedSongs] = useState();
  useEffect(() => {
    songs &&
      setRenderedSongs(
        songs.map((song, index) => (
          <React.Fragment key={index}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar
                  src={song.cover ?? musicIcon}
                //   width={60}
                //   height={60}
                  alt={song.alt}
                  style={{marginRight:30, width:60, height:60}}
                ></Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={song.title}
                secondary={song.artist}
              ></ListItemText>
            </ListItem>
            {index < songs.length - 1 && <Divider></Divider>}
          </React.Fragment>
        ))
      );
  }, [songs]);

  return (
    <List
      sx={{ width: "80vh", maxWidth: "100vh", bgcolor: "rgb(255,255,255,0.8)" }}
    >
      {renderedSongs}
    </List>
  );
};

export default PlaylistView;
