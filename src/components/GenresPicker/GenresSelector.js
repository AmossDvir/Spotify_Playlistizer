import React, { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import GenreChip from "./GenreChip";
import { generateRandomColorString, getAvarageRGBValue } from "../common";
import ClearIcon from "@mui/icons-material/Clear";
import IconButton from "@mui/material/IconButton";
import "./GenresPicker.css";

const ITEM_HEIGHT = 52;
const ITEM_PADDING_TOP = 80;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

var colors = new Array(1000)
  .fill(null)
  .map((elem) => generateRandomColorString(0.7));

const getStyles = (genre, personName) => {
  return {
    fontWeight: personName.indexOf(genre) === -1 ? 300 : 400,
  };
};

const GenresSelector = ({ items, setGenresList }) => {
  const theme = useTheme();
  const [genresPicked, setGenresPicked] = useState([]);
  const [availableGenres, setAvailableGenres] = useState([]);

  useEffect(() => {
    const colorSets = items.map((item, index) => {
      let color = colors[index];
      return {
        value: item,
        color: getAvarageRGBValue(color) > 127 ? "black" : "white",
        bgColor: color,
      };
    });
    setAvailableGenres(colorSets);
  }, [items]);

  const onGenreDelete = (e, value) => {
    onUpdateGenres(genresPicked.filter((genre) => genre !== value));
    // setGenresPicked(genresPicked.filter((genre) => genre !== value));
  };

  const onUpdateGenres = (genres) => {
    setGenresPicked(genres);
    const genresWithColors = genres.map((genre) =>
      availableGenres.find((colorSet) => colorSet.value === genre)
    );
    setGenresList(genresWithColors);
  };

  const onGenreChange = (event) => {
    const {
      target: { value },
    } = event;
    // On autofill we get a stringified value.
    const genres = typeof value === "string" ? value.split(",") : value;

    const genresWithColors = genres.map((genre) =>
      availableGenres.find((colorSet) => colorSet.value === genre)
    );
    setGenresPicked(genres);
    setGenresList(genresWithColors);
  };

  return (
    <div className="genres-selector">
      <FormControl sx={{ width: "100%" }} size="medium">
        <InputLabel sx={{ fontWeight: 400 }} id="demo-multiple-chip-label">
          Pick Genres
        </InputLabel>
        <Select
          required
          sx={{
            fontWeight: 400,
            "& .MuiSelect-iconOutlined": {
              display: genresPicked.length === 0 ? "" : "none",
            },
            "&.Mui-focused .MuiIconButton-root": { color: "primary.main" },
          }}
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={genresPicked}
          onChange={onGenreChange}
          input={<OutlinedInput id="select-multiple-chip" label="pickgenre" />}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
              {selected.map((value, index) => (
                <GenreChip
                  key={`${index}_${value}`}
                  value={value}
                  onGenreDelete={onGenreDelete}
                  color={
                    availableGenres.find((colorSet) => colorSet.value === value)
                      .color
                  }
                  bgColor={
                    availableGenres.find((colorSet) => colorSet.value === value)
                      .bgColor
                  }
                ></GenreChip>
              ))}
            </Box>
          )}
          endAdornment={
            <IconButton
              sx={{ visibility: genresPicked ? "visible" : "hidden" }}
              onClick={() => onUpdateGenres([])}
            >
              <ClearIcon
                sx={{
                  display: genresPicked.length === 0 ? "none" : "",
                  position: "absolute",
                }}
              />
            </IconButton>
          }
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
