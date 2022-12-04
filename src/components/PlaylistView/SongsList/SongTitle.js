import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import AudiotrackIcon from "@mui/icons-material/Audiotrack";


const SongTitle = ({ songName, songArtists, image }) => {
  return (
    <List sx={{ cursor: "default", width: "100%"}}>
      <ListItem>
        <ListItemAvatar>
          <Avatar variant="square">
            {image ? (
              <img alt="Album Cover" style={{ height: "inherit" }} src={image}></img>
            ) : (
              <AudiotrackIcon />
            )}
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={songName} primaryTypographyProps={{style:{fontWeight:100}}} secondary={songArtists} secondaryTypographyProps={{style:{color:'#b5b5b5'}}}/>
      </ListItem>
    </List>
  );
};

export default SongTitle;
