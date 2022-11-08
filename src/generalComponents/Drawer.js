import React, { useState, useEffect } from "react";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";


const Drawer = ({ direction, children, open, setOpen }) => {

  const [isOpen, setIsOpen] = useState(open);

  useEffect(() => setIsOpen(open), [open]);

  const toggleDrawer = (open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setOpen(open);
    setIsOpen(open);
  };

  return (
    <div key={direction}>
      <SwipeableDrawer
        anchor={direction}
        open={isOpen}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        {children}
      </SwipeableDrawer>
    </div>
  );
};

export default Drawer;
