import React, { useEffect, useState } from "react";
import { DataGrid,  useGridApiEventHandler,
  useGridApiContext, } from "@mui/x-data-grid";
import prepareTableData from "../prepareTableData";

const SongsList = ({ songsList }) => {


  const [tableData, setTableData] = useState([]);
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
      prepareTableData(songsList, ["songNumber", "title", "album", "duration", "genre"] )
    );
  }, []);

  return (
    <div
      style={{
        display: "flex",
        backgroundColor: "grey",
        justifyContent: "center",
        height: '50vh',
        width: "80%",
      }}
    >
      {tableData.rows && (
        <DataGrid
        componentsProps={{
          row: { onMouseOver: (e) => console.log(e) },
          }}
          sx={{
            "& .MuiDataGrid-columnHeader": { cursor: "default" },
            borderColor: "primary.light",
            "& .MuiDataGrid-cell:hover": {
              color: "primary.main",
            },
            "& .MuiDataGrid-cell:focus": {
              outline: "none",
              fontWeight:500
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
