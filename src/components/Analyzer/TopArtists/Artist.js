import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import { Box, CardActionArea } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { modifyArtistSummaryString } from "../../common";

const Artist = ({ artist, index, summary }) => {
    const [summaryVisible, setSummaryVisible] = useState(false);
  return (
    <Card sx={{ maxWidth: 400,width:400, backgroundColor:'neutral.lightest' }}>
      <CardActionArea onClick={() => setSummaryVisible(!summaryVisible)}>
      <CardHeader title={`#${index}`}></CardHeader>
        <CardMedia
          component="img"
          height="400"
          image={artist?.images[0]?.url}
          alt={artist?.name}
          sx={{  objectFit: "contain" }}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {artist?.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {`Songs in Library: ${artist.frequency}`}
          </Typography>
          {summaryVisible && <Typography>{modifyArtistSummaryString(summary)}</Typography>}
        </CardContent>
        <Box display='flex' alignContent='center' justifyContent='center'>{summaryVisible ? <ExpandLessIcon></ExpandLessIcon>: <ExpandMoreIcon></ExpandMoreIcon>}</Box>
      </CardActionArea>
    </Card>
  );
};

export default Artist;
