import React, { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import { generateRandomColorString, getAvarageRGBValue } from "../common";
import ClearIcon from "@mui/icons-material/Clear";
import IconButton from "@mui/material/IconButton";
import CancelIcon from '@mui/icons-material/Cancel';
import "./GenresPicker.css";


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

var colors = new Array(1000).fill(null).map(elem => generateRandomColorString(0.7));

function getStyles(genre, personName) {
  return {
    fontWeight: personName.indexOf(genre) === -1 ? 300 : 400,
  };
}

const GenresSelector = ({ items, setGenresList }) => {
  const theme = useTheme();
  const [genresPicked, setGenresPicked] = useState([]);

  const colorSets = items.map((item, index) => {
    let color = colors[index];
    return { value: item, color:getAvarageRGBValue(color) > 127 ?'black' :'white' , bgColor: color};
  });

  const onGenreDelete = (e, value) => {
    setGenresPicked(genresPicked.filter((genre) => genre !== value));
  }

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    // On autofill we get a stringified value.
    const genres = typeof value === "string" ? value.split(",") : value;
    setGenresPicked(genres);
    setGenresList(genres);
  };


  return (
    <div className="genres-selector">
      <FormControl sx={{ mt: 10, width: "100%" }} size='medium'>
        <InputLabel sx={{ fontWeight: 400 }} id="demo-multiple-chip-label">
          Pick Genres
        </InputLabel>
        <Select
        required
          sx={{fontWeight: 400, "& .MuiSelect-iconOutlined": {display: genresPicked.length === 0 ? '': 'none'}, "&.Mui-focused .MuiIconButton-root": {color: 'primary.main'}}}
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={genresPicked}
          onChange={handleChange}
          input={
            <OutlinedInput id="select-multiple-chip" label="pickgenre"/>
          }
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
              {selected.map((value) => (
                <Chip
                deleteIcon={<CancelIcon />}
                onMouseDown={(event) => {
                  event.stopPropagation();
                }}
                onDelete={(e) => onGenreDelete(e, value)}
                  key={value}
                  label={value}
                  sx={{ color: colorSets.find(colorSet => colorSet.value === value).color, backgroundColor: colorSets.find(colorSet => colorSet.value === value).bgColor }}
                />
              ))}
            </Box>
          )}
          endAdornment={<IconButton sx={{visibility: genresPicked? "visible": "hidden"}} onClick={() => setGenresPicked([])}><ClearIcon sx={{display: genresPicked.length === 0 ? 'none': '', position:'absolute'}}/></IconButton>}
          MenuProps={MenuProps}
        >
          {items.map((item) => (
            <MenuItem
              key={item}
              value={item}
              style={getStyles(item, genresPicked, theme)}
            >
              {item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};
export default GenresSelector;
