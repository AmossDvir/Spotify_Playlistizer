import React, { useRef } from "react";
import {
  List,
  AutoSizer,
  CellMeasurer,
  CellMeasurerCache,
} from "react-virtualized";
import { Song } from "./Song";
import { Divider } from "@mui/material";

const VirtualSongsList = ({ songsListData }) => {
  const cache = useRef(
    new CellMeasurerCache({
      fixedWidth: true,
      defaultHeight: 100,
    })
  );

  return (
    <div>
      <div
        style={{
          width: "80%",
          height: "60vh",
          margin: "0 auto",
          backgroundColor: "rgb(100,100,100,0.3)",
          border: `1px solid grey`,
          borderRadius: "10px",    display: "flex",

        }}
      >
        <AutoSizer>
          {({ width, height }) => (
            <List
              //   style={{ border: "solid 1px rgb(200,200,200)" }}
              width={width}
              height={height}
              rowHeight={cache.current.rowHeight}
              deferredMeasurementCache={cache.current}
              rowCount={songsListData.length}
              rowRenderer={({ key, index, style, parent }) => {
                const song = songsListData[index];
                return (
                  <CellMeasurer
                    key={key}
                    cache={cache.current}
                    parent={parent}
                    columnIndex={0}
                    rowIndex={index}
                  >
                    <div style={style}>
                      <Song songData={song}></Song>
                      {index < songsListData.length - 1 ? <Divider /> : <></>}
                    </div>
                  </CellMeasurer>
                );
              }}
            ></List>
          )}
        </AutoSizer>
      </div>
    </div>
  );
};

export default VirtualSongsList;
