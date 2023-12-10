import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import { Box, CardActionArea } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { modifyArtistSummaryString } from "../../common";

const Artist = ({ artist, index, summary }) => {
  const [summaryVisible, setSummaryVisible] = useState(false);
  return (
    <Card sx={{ maxWidth: 400, backgroundColor: "neutral.lightest" }}>
      <CardActionArea onClick={() => setSummaryVisible(!summaryVisible)}>
        <CardHeader
          sx={{
            fontSize: "10px",
            paddingRight: "16px",
            paddingTop: "16px",
            paddingLeft: "16px",
            paddingBottom:'0px'
          }}
          title={`#${index}`}
        ></CardHeader>
        <CardMedia
          component="img"
          height="400"
          image={artist?.images[0]?.url}
          alt={artist?.name}
          sx={{ objectFit: "contain" }}
        />
        <CardContent sx={{
            fontSize: "10px",
            paddingRight: "16px",
            paddingTop: "0px",
            paddingLeft: "16px",
            paddingBottom:'16px'
          }}>
          <Typography gutterBottom variant="h6" component="div">
            {artist?.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {`Songs in Library: ${artist.frequency}`}
          </Typography>
          {summaryVisible && (
            <Typography sx={{fontSize:'13px', paddingY:'10px'}}>{modifyArtistSummaryString(summary)}</Typography>
          )}
        </CardContent>
        <Box display="flex" alignContent="center" justifyContent="center">
          {summaryVisible ? (
            <ExpandLessIcon></ExpandLessIcon>
          ) : (
            <ExpandMoreIcon></ExpandMoreIcon>
          )}
        </Box>
      </CardActionArea>
    </Card>
  );
};

export default Artist;
