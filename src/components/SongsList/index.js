import React, { useEffect, useState } from "react";
import { Song } from "./Song";
import { Divider } from "@mui/material";

const SongsList = ({ songsListData }) => {
  const [renderedList, setRenderedList] = useState();
  useEffect(() => {
    if (songsListData) {
      setRenderedList(
        songsListData.map((songData, index) => (
          <div>
            <Song songData={songData}></Song>
            {index < songsListData.length - 1 ? (
              <Divider sx={{ paddingTop: "5px" }} />
            ) : (
              <></>
            )}
          </div>
        ))
      );
    }
  }, [songsListData]);

  return <div style={{ marginTop: "30px" }}>{renderedList}</div>;
};

export default SongsList;
