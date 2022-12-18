import React, {useEffect, useState} from "react";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from '@mui/material/styles';


const GenresList = ({ genres }) => {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    fontWeight:400,
    color: theme.palette.text.secondary,
  }));

  const [renderedGenres, setRenderedGenres] = useState();

  useEffect(() => genres && setRenderedGenres(genres.map((genre) => <Item>{genre}</Item>)), [genres]);

  return (
    <div>
      <Stack
      
        direction="row"
        divider={<Divider orientation="vertical" flexItem />}
        spacing={2}
      >{renderedGenres??<></>}

      </Stack>
    </div>
  );
};

export default GenresList;
