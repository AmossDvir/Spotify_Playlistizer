import { Typography } from "@mui/material";
import React, { useState, createRef, useEffect } from "react";
import DraggableKnob from "./DraggableKnob";
import "./PlaylistPanel.css";
import Button from "@mui/material/Button";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { styled } from "@mui/material/styles";
import { purple } from "@mui/material/colors";

const PlaylistPanel = () => {
  const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(purple[500]),
    display: "flex",
    backgroundColor: purple[500],
    "&:hover": {
      backgroundColor: purple[700],
    },
  }));

  const size = 75;
  const panelRef = createRef();
  const [bgColor, setBgColor] = useState("rgb(100,150,150)");
  const [position, setPosition] = useState();

  const onCreatePlaylist = () => {
    console.log("sdj");
  };

  const handleMovement = (e, position) => {
    setBgColor(
      `rgb(${(position.y / panelRef.current.offsetHeight) * 255},${Math.abs(
        (position.x / panelRef.current.offsetWidth) * 255
      )},${Math.abs(
        255 -
          ((position.y + position.x) /
            (panelRef.current.offsetWidth + panelRef.current.offsetHeight)) *
            255
      )})`
    );
    console.log(bgColor);
  };
  useEffect(
    () =>
      setPosition({
        x: panelRef.current.offsetWidth / 2 - size / 2,
        y: panelRef.current.offsetHeight / 2 - size / 2,
      }),
    []
  );
  return (
    <div style={{display: 'flex', flexDirection:'column', alignItems:'center'}}>
      <div
        className="panel"
        ref={panelRef}
        style={{
          backgroundColor: bgColor,
          position: "relative",
          overflow: "auto",
          padding: "0",
        }}
      >
        {position && (
          <DraggableKnob
            defaultPosition={position}
            handleMovement={handleMovement}
            knobSize={size}
          ></DraggableKnob>
        )}
        <div>
        </div>
      </div>
      <div style={{marginTop:'2%'}}>
      <ColorButton variant="contained" onClick={onCreatePlaylist}>Create Playlist</ColorButton>
</div>
    </div>
  );
};

export default PlaylistPanel;
