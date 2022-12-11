import React, {useState} from "react";
import { useSelector } from "react-redux";

import List from "@mui/material/List";
import { Tooltip } from "@mui/material";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import AudiotrackIcon from "@mui/icons-material/Audiotrack";
import { ListItemIcon } from "@material-ui/core";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { likeSong } from "../../../controllers/spotify/likeSongController";
import "./SongTitle.css";



const SongTitle = ({
  songName,
  songArtists,
  image,
  liked,
  hoveredRow,
  songId,
}) => {

  const onLikeClick = (e) => {
    likeSong(songId, true, localStorage.getItem(userSelector.userId + "spotifyAccessToken"));
    setIsLiked(!isLiked);
  };
  const userSelector = useSelector((state) => state.user.value);
  const [isLiked, setIsLiked] = useState(liked);
  return (
    <List sx={{ cursor: "default", width: "100%" }}>
      <ListItem>
      <Tooltip title={`${isLiked? "Remove from":"Save to"} Your Library`} enterDelay={500} placement="top">
          
        <ListItemIcon
          className={hoveredRow ? "liked-icon" : ""}
          onClick={onLikeClick}
          
        >
          {isLiked ? (
            <FavoriteIcon
              // className={hoveredRow ? "liked-icon" : ""}
              sx={{ color: "rgb(142 36 170)"}}

            />
          ) : (
            <FavoriteBorderIcon className={hoveredRow ? "liked-icon" : ""}/>
          )}
        </ListItemIcon>
        </Tooltip>
        <ListItemAvatar>
          <Avatar variant="square">
            {image ? (
              <img
                alt="Album Cover"
                style={{ height: "inherit" }}
                src={image}
              ></img>
            ) : (
              <AudiotrackIcon />
            )}
          </Avatar>
        </ListItemAvatar>

        <ListItemText
          primary={songName}
          primaryTypographyProps={{ style: { fontWeight: 100 } }}
          secondary={songArtists}
          secondaryTypographyProps={{ style: { color: "#b5b5b5" } }}
        />
      </ListItem>
    </List>
  );
};

export default SongTitle;
