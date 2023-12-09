import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Typography } from "@mui/material";
import {
  localize,
  convertArtistsArrayToString,
  calculateColFlexValue,
  convertMillisToMinutesAndSeconds,
  convertMSToSeconds,
} from "../common";
import GenreChip from "../GenresPicker/GenreChip";
import SongTitle from "./SongsList/SongTitle";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import { pauseSong } from "../../model/songPlaybackSlice";
import "./SongsList/TableStyle.css";
import AnimatedSoundBars from "../../generalComponents/AnimatedSoundBars";

const DisplayIcon = ({ onPlaySongClick, rowIndex, songId, hoveredRow, rowsData }) => {
  const playerSelector = useSelector((state) => state.songPlayback.value);
  
  const playedSongExistsInPlaylist = playerSelector.isPlaying && rowsData.filter(song => song.id === playerSelector.song.id).length > 0;
  const dispatch = useDispatch();
  const onPauseSongClick = () => {
    dispatch(pauseSong());
  };
  var icon = null;
  if (hoveredRow === rowIndex) {
    if (playedSongExistsInPlaylist && playerSelector.song.id === songId) {
      icon = <PauseIcon onClick={onPauseSongClick} />;
    } else {
      icon = <PlayArrowIcon onClick={() => onPlaySongClick(rowIndex)} />;
    }
  } else {
    if (playedSongExistsInPlaylist && playerSelector.song.id === songId) {
      icon = <AnimatedSoundBars></AnimatedSoundBars>;
    } else {
      icon = rowIndex + 1;
    }
  }
  return icon;
};

const prepareTableData = (
  rowsData,
  columnsLabels,
  hoveredRow,
  onPlaySongClick
) => {
  const sortTitles = (title1, title2) =>
    title1.props.songName.localeCompare(title2.props.songName);
  const sortGenres = (genre1, genre2) =>
    genre1.props.value.localeCompare(genre2.props.value);
  const sortDurations = (duration1, duration2) =>
    convertMSToSeconds(duration1) - convertMSToSeconds(duration2);

  const prepareRowsData = () =>
    rowsData.map((row, index) => {
      return {
        title: (
          <div style={{paddingTop:'16px', alignItems:'left', justifyContent:'start'}}>
          <SongTitle
            songName={row.name}
            songArtists={convertArtistsArrayToString(row.artists)}
            image={row.album?.images[0]?.url}
            hoveredRow={hoveredRow === index}
            liked={row.liked}
            songId={row.id}
          ></SongTitle></div>
        ),
        // title: <div style={{}}>{row.name}</div>,
        duration: convertMillisToMinutesAndSeconds(row?.duration_ms),
        album: row?.album?.name,
        genre: (
          <GenreChip
            value={row?.genre?.value}
            color={row?.genre?.color}
            bgColor={row?.genre?.bgColor}
          />
        ),
      };
    });

  const data = { columns: [], rows: [] };

  const rowsDataPrepared = prepareRowsData();
  const rows = [];

  for (let rowIndex = 0; rowIndex < rowsDataPrepared.length; rowIndex += 1) {
    const row = {
      id: rowIndex,
      songNumber: <DisplayIcon onPlaySongClick={onPlaySongClick} rowIndex={rowIndex} songId={rowsData[rowIndex].id} hoveredRow={hoveredRow} rowsData={rowsData}></DisplayIcon>,
    };

    for (let colIndex = 1; colIndex < columnsLabels.length; colIndex += 1) {
      const columnLabel = columnsLabels[colIndex];
      row[columnLabel] = rowsDataPrepared[rowIndex][columnLabel];
    }
    rows.push(row);
  }

  const columns = [];

  for (let colIndex = 0; colIndex < columnsLabels.length; colIndex += 1) {
    let colField = columnsLabels[colIndex];
    let value = localize(colField);

    columns.push({
      renderCell: (params) => (
        <Typography
          variant="contained"
          color="white"
          sx={{
            cursor: "default",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {params.value}
        </Typography>
      ),
      ...(colField === "songNumber"
        ? { width: 50, paddingLeft: "0px" }
        : colField === "duration"
        ? { width: 200 }
        : { flex: calculateColFlexValue(rows, colField) }),
      field: colField,
      headerName: value,
      headerClassName: "test",
      headerAlign: "left",
      align: colField === "songNumber" ? "center" : "left",
      // textAlign:'left',

      ...(colField === "title" ? { sortComparator: sortTitles } : {}),
      ...(colField === "genre" ? { sortComparator: sortGenres } : {}),
      ...(colField === "duration" ? { sortComparator: sortDurations } : {}),
      // valueGetter: (params) => (colField === "title" ? params.row.title.props.songName:params.value),
    });
  }

  data.columns = columns;
  data.rows = rows;

  return data;
};

export default prepareTableData;
