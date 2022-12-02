import { Typography } from "@mui/material";
import {
  localize,
  convertArtistsArrayToString,
  calculateColFlexValue,
  millisToMinutesAndSeconds,
} from "../common";
import SongTitle from "./SongsList/SongTitle";

const prepareTableData = (rowsData, columnsLabels) => {
  console.log(rowsData);

  const sortTitle = (title1, title2) => title1.props.songName > title2.props.songName;

  const prepareRowsData = (
  ) =>
    rowsData.map((row, index) => {
      return {
        title: (
          <SongTitle
            songName={row.name}
            songArtists={convertArtistsArrayToString(row.artists)}
            image={row.album.images[0].url}
          ></SongTitle>
        ),
        // title: <div style={{}}>{row.name}</div>,
        duration: millisToMinutesAndSeconds(row.duration_ms),
        album: row.album.name,
        genre: row.genre
      };
    });

  const data = { columns: [], rows: [] };

  const rowsDataPrepared = prepareRowsData();
  const rows = [];

  for (let rowIndex = 0; rowIndex < rowsDataPrepared.length; rowIndex += 1) {
    const row = { id: rowIndex, songNumber: rowIndex + 1 };

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
      flex: calculateColFlexValue(rows, colField),
      field: colField,
      headerName: value,
      headerAlign: "left",
      align: "left",
      minWidth: 50,
      ...(colField === "title") ? {sortComparator:sortTitle}:{},
      // valueGetter: (params) => (colField === "title" ? params.row.title.props.songName:params.value),
    });
  }
  console.log(columns);

  data.columns = columns;
  data.rows = rows;

  return data;
};

export default prepareTableData;
