import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  DataGrid,
  useGridApiEventHandler,
  useGridApiContext,
} from "@mui/x-data-grid";
import prepareTableData from "../prepareTableData";
import UseMobileWidth from "../../../generalComponents/UseMobileWidth";
import { playSong } from "../../../model/songPlaybackSlice";
// import PlayerControlButtons from "./PlayerControlButtons";

const SongsList = ({ songsList }) => {
  const [tableData, setTableData] = useState([]);
  const [hoveredRow, setHoveredRow] = useState(null);

  const isMobile = UseMobileWidth();
  const dispatch = useDispatch();

  const onPlaySongClick = (rowIndex) => {
    dispatch(playSong(songsList[rowIndex]));
  }
  // const apiRef = useGridApiContext();

  // useEffect(() => {
  //   const onHover = () => {
  //     console.log("hiii")
  //   }

  //   // The `subscribeEvent` method will automatically unsubscribe in the cleanup function of the `useEffect`.
  //   return apiRef.current.subscribeEvent('rowMouseEnter', onHover);
  // }, [apiRef]);

  useEffect(() => {
    setTableData(
      prepareTableData(songsList, isMobile?[
        "songNumber",
        "title",
        // "album",
        "genre",
      ]:[
        "songNumber",
        "title",
        "album",
        "duration",
        "genre",
      ], hoveredRow, onPlaySongClick)
    );
  }, [hoveredRow, isMobile]);

  return (
    <div
      style={{
        display: "flex",
        backgroundColor: "#4d4d4d",
        justifyContent: "center",
        height: "50vh",
        width: "93vw",
      }}
    >
      {tableData.rows && (

          <DataGrid
            componentsProps={{
              row: { onMouseOver: (e) => setHoveredRow(Number(e.currentTarget.getAttribute("data-id"))), onMouseLeave:(e) => setHoveredRow(null)},
             
            }}
            sx={{
              backgroundColor:'#424554',
              "& .MuiDataGrid-columnHeader": { cursor: "default" },
              borderColor: "primary.light",
              "& .MuiDataGrid-cell:hover": {
                color: "primary.main",
              },
              "& .MuiDataGrid-cell:focus": {
                outline: "none",
                fontWeight: 500,
              },
              "& .MuiDataGrid-columnHeader:focus": {
                outline: "none",
                // backgroundColor:'black'
              },
              "& .MuiDataGrid-sortIcon:focus": {
                outline: "none !important",
              },
            }}
            rows={tableData.rows}
            columns={tableData.columns}
            columnBuffer={2}
            columnThreshold={2}
            pageSize={100}
            disableColumnMenu
            disableColumnSelector
            rowHeight={65}
            withBorder={false}
            hideFooterSelectedRowCount={true}
            // components={{Toolbar:PlayerControlButtons}}
            hideFooterPagination={false}
            // onRowMouseEnter={(params, event) => {
            //   console.log(params);
            // }}
            // apiRef={apiRef}
            // rowMouseEnter={onHover}
            // getRowHeight={(row) =>{console.log(row);return row.id}}
            // autoHeight
          />

      )}
    </div>
  );
};

export default SongsList;
