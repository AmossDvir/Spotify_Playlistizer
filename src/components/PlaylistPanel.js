import React, { useState } from "react";
import DraggableKnob from "./DraggableKnob";

const PlaylistPanel = () => {
  const [bgColor, setBgColor] = useState("rgb(100,150,150)");

  const handleMovement = (position, e) => {
    setBgColor(
      `rgb(${(position.x / e.view.window.innerWidth) * 255},${
        (position.y / e.view.window.innerHeight) * 255
      },150)`
    );
  };
  return (
    <div className="panel" style={{ backgroundColor: bgColor }}>
      <DraggableKnob
        defaultPosition={{ x: 400, y: 500 }}
        handleMovement={handleMovement}
      ></DraggableKnob>
    </div>
  );
};

export default PlaylistPanel;
