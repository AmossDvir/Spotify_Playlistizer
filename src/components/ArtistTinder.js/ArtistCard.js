import React, {useState} from "react";
import { Typography } from "@mui/material";
import TinderCard from "react-tinder-card";
import GenreChip from "../GenresPicker/GenreChip";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { Box } from "@mui/material";
import { modifyArtistSummaryString } from "../common";


const ArtistCard = React.memo(({ artist, index, currentCardIndex, onSwipe })  => {

  const [summaryVisible, setSummaryVisible] = useState(false);


  return (
    <div
      style={{ gridRowStart: 1, gridColumnStart: 1 }}
    >
      <TinderCard
      
        preventSwipe={["up", "down"]}
        draggable={false}
        className="swipe"
        swipeThreshold={1.5}
        maxVelocity={10}
        key={artist.data.name}
        onSwipe={(dir) => {
          if (dir === "left" || dir === "right") {
            onSwipe(dir, artist.data.name, index);
          }
        }}
        //   onCardLeftScreen={() => outOfFrame(artist.name)}
        flickOnSwipe
      ><div onClick={() => setSummaryVisible(!summaryVisible)}>
        <div style={{display:'flex', justifyContent:'center'}}>
        <Typography mt={1} mb={1} >{artist?.data?.name}</Typography></div>
        <div
          draggable={false}
          className={"card-image"}
        >
          <img
          
            draggable={false}
            alt="Album Cover"
            style={{ width: "350px", height:'380px', objectFit: 'cover' }}
            src={artist?.data?.images[1].url}
          ></img>
          {/* <h3>{artist.name}</h3> */}
        </div>
        <div style={{display:'flex', width: '350px', flexDirection: 'column'}}>
        <div style={{margin:'20px'}}>
        {artist?.data?.genres?.length > 0 ? artist?.data?.genres?.map((genre => <GenreChip value={genre} color={artist.genre.color} bgColor={artist.genre.bgColor}></GenreChip>)):<GenreChip value={artist.genre.value} color={artist.genre.color} bgColor={artist.genre.bgColor}></GenreChip>}</div>
        {summaryVisible && <Typography
          sx={{ maxWidth: "fit-content", overflowWrap: "break-word", margin:'20px', fontSize:'14px'}}
        >

          {modifyArtistSummaryString(artist.data.summary)}
        </Typography>}
        
        </div>
        <Box display='flex' alignContent='center' justifyContent='center'>{summaryVisible ? <ExpandLessIcon></ExpandLessIcon>: <ExpandMoreIcon></ExpandMoreIcon>}</Box>
      </div>
      </TinderCard>
    </div>
  );
}, (prevProps, nextProps) => {
  return prevProps.index === nextProps.index;
});

export default ArtistCard;
