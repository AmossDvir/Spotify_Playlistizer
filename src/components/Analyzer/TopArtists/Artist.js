import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

const Artist = ({ artist, index, summary }) => {
    const [summaryVisible, setSummaryVisible] = useState(false);
  return (
    <Card sx={{ maxWidth: 345, maxHeight:600 }}>
      <CardActionArea onClick={() => setSummaryVisible(!summaryVisible)}>
      <CardHeader title={`#${index}`}></CardHeader>
        <CardMedia
          component="img"
          height="200rem"
          image={artist?.images[0]?.url}
          alt={artist?.name}
        //   sx={{  objectFit: "contain" }}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {artist?.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {`Songs in Library: ${artist.frequency}`}
          </Typography>
          {summaryVisible && <Typography>{summary}</Typography>}
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default Artist;
