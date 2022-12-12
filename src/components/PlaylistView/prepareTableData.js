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
import "./SongsList/TableStyle.css";

const prepareTableData = (rowsData, columnsLabels, hoveredRow) => {
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
          <SongTitle
            songName={row.name}
            songArtists={convertArtistsArrayToString(row.artists)}
            image={row.album?.images[0]?.url}
            hoveredRow={hoveredRow === index}
            liked={row.liked}
            songId={row.id}
          ></SongTitle>
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
      songNumber:
        // hoveredRow === rowIndex ? (
        //   <PlayArrowIcon
        //     sx={{ width: 25, cursor: "pointer", alignContent: "center" }}
        //   ></PlayArrowIcon>
        // ) : (
          rowIndex + 1,
        // ),
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
        ? { width: 50 }
        : colField === "duration"
        ? { width: 200 }
        : { flex: calculateColFlexValue(rows, colField) }),
      field: colField,
      headerName: value,
      headerClassName: "test",
      headerAlign: "left",
      align: "left",
      
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
