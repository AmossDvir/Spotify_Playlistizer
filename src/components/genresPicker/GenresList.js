import React from "react";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from '@mui/material/styles';


const GenresList = () => {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  return (
    <div>
      <Stack
      
        direction="row"
        divider={<Divider orientation="vertical" flexItem />}
        spacing={2}
      >
        <Item>Rock</Item>
        <Item>Pop</Item>
        <Item>Classic</Item>
      </Stack>
    </div>
  );
};

export default GenresList;
