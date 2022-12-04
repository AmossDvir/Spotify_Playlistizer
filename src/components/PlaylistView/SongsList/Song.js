import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";

const useStyles = makeStyles((theme) => ({

  root: {
    "&:hover": {
      transition: "all .4s",
      border: `1px solid ${theme.palette.grey[500]}`,
      boxShadow: theme.shadows[4],
      backgroundColor:'white'
    },
    border: `1px solid ${theme.palette.grey[400]}`,
    backgroundColor:theme.palette.grey[100],
    boxShadow: theme.shadows[1],
    borderRadius: "10px",    display: "flex",
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight:theme.spacing(2),
    marginBottom:"4px",
    marginTop:"4px"
  },
  details: {
    display: "flex",
    flexDirection: "column",
  },
  content: {
    flex: "1 0 auto",
  },
  cover: {
    width: 80, height:80,
  },
  controls: {
    display: "flex",
    alignItems: "center",
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
}));


export const Song = ({ songData }) => {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <Card className={classes.root}>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h6" variant="h6">
            {songData.name}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {songData.artists.map((artist, index) =>
              index >= songData.artists.length - 1
                ? artist.name
                : artist.name + ", "
            )}
          </Typography>
        </CardContent>
        <div className={classes.controls}>
          <IconButton aria-label="previous">
            {theme.direction === "rtl" ? (
              <SkipNextIcon />
            ) : (
              <SkipPreviousIcon />
            )}
          </IconButton>
          <IconButton aria-label="play/pause">
            <PlayArrowIcon className={classes.playIcon} />
          </IconButton>
          <IconButton aria-label="next">
            {theme.direction === "rtl" ? (
              <SkipPreviousIcon />
            ) : (
              <SkipNextIcon />
            )}
          </IconButton>
        </div>
      </div>
      <CardMedia
        className={classes.cover}
        image={songData.album.images[2].url}
        title={songData.album.name}
      />
    </Card>
  );
};
