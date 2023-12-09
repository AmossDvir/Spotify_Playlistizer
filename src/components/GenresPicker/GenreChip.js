import React from "react";
import Chip from "@mui/material/Chip";
import CancelIcon from "@mui/icons-material/Cancel";

const GenreChip = ({ value, color, bgColor, onGenreDelete }) => {
  return (
    <Chip
      {...(onGenreDelete ? { deleteIcon: <CancelIcon /> } : {})}
      onMouseDown={(event) => event.stopPropagation()}
      {...(onGenreDelete ? { onDelete: (e) => onGenreDelete(e, value) } : {})}
      key={value}
      label={value}
      sx={{
        fontSize:'14px',
        color,
        backgroundColor: bgColor,
      }}
    />
  );
};

export default GenreChip;
