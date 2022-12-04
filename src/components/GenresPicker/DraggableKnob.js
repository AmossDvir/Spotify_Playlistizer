import React, { useState } from "react";
import Draggable from "react-draggable";

const DraggableKnob = ({ defaultPosition, handleMovement, knobSize }) => {
  const [position, setPosition] = useState(defaultPosition);
  const [color, setColor] = useState("grey");

  const onKnobDrag = (e, ui) => {
    setPosition({ x: position.x + ui.deltaX, y: position.y + ui.deltaY });
    handleMovement(e, position)
  };

  return (
    <Draggable
      grid={[1, 1]}
      defaultPosition={defaultPosition}
      bounds="parent"
      onStart={() => setColor("rgb(91, 192, 98)")}
      onStop={() => setColor("grey")}
      onDrag={onKnobDrag}
      position={position}
    >
      <div
        style={{
          width: knobSize,
          height: knobSize,
          borderRadius: knobSize / 2,
          backgroundColor: color,
          borderStyle: 'solid',
          borderWidth:'1px'
        }}
      ></div>
    </Draggable>
  );
};

export default DraggableKnob;
