import React, { useState, useEffect } from "react";
import List from "@mui/material/List";
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
import UseMobileWidth from "../../../generalComponents/UseMobileWidth";
import ColoredTooltip from "../../../generalComponents/ColoredTooltip";
import { useContext } from "react";
import { UserContext } from "../../../context/UserContext";

const SongTitle = ({
  songName,
  songArtists,
  image,
  liked,
  hoveredRow,
  songId,
  small = false,
}) => {
  const isMobile = UseMobileWidth();
  const [userContext, setUserContext] = useContext(UserContext);

  const [isLiked, setIsLiked] = useState(liked);

  const onLikeClick = () => {
    likeSong(
      songId,
      true,
      localStorage.getItem(userContext?.userId + "spotifyAccessToken")
    );
    setIsLiked(!isLiked);
  };

  useEffect(() => setIsLiked(liked), [liked]);
  return (
    <List
      sx={{
        cursor: "default",
        width: "100%",
        paddingLeft: "0px",
        paddingTop: "0px",
      }}
    >
      <ListItem sx={{ paddingTop: "0px", paddingLeft:'0px' }}>
        <ColoredTooltip
          title={`${isLiked ? "Remove from" : "Save to"} Your Library`}
          enterDelay={500}
          placement="top"
        >
          <ListItemIcon onClick={onLikeClick}>
            {isLiked ? (
              <FavoriteIcon color="primary" />
            ) : (
              <FavoriteBorderIcon className={hoveredRow ? "liked-icon" : ""} />
            )}
          </ListItemIcon>
        </ColoredTooltip>
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
          primaryTypographyProps={{
            style: {
              fontWeight: 100,
              fontSize: isMobile ? "15px" : small ? "18px" : "22px",
            },
          }}
          secondary={songArtists}
          secondaryTypographyProps={{
            style: {
              color: "#b5b5b5",
              fontSize: isMobile ? "13px" : small ? "15px" : "19px",
            },
          }}
        />
      </ListItem>
    </List>
  );
};

export default SongTitle;
