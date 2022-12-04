import React, { useEffect, useState } from "react";
import {
  DataGrid,
  useGridApiEventHandler,
  useGridApiContext,
} from "@mui/x-data-grid";
import prepareTableData from "../prepareTableData";

const SongsList = ({ songsList }) => {
  const [tableData, setTableData] = useState([]);
  const [hoveredRow, setHoveredRow] = useState(null);

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
      prepareTableData(songsList, [
        "songNumber",
        "title",
        "album",
        "duration",
        "genre",
      ], hoveredRow)
    );
  }, [hoveredRow]);

  return (
    <div
      style={{
        display: "flex",
        backgroundColor: "#4d4d4d",
        justifyContent: "center",
        height: "50vh",
        width: "80%",
      }}
    >
      {tableData.rows && (

          <DataGrid
            componentsProps={{
              row: { onMouseOver: (e) => setHoveredRow(Number(e.currentTarget.getAttribute("data-id"))), onMouseLeave:(e) => setHoveredRow(null)},
             
            }}
            sx={{
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
