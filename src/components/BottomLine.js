import { Typography, Box, CssBaseline } from "@material-ui/core";

const BottomLine = () => {
  return (
    <Box mt={5} sx={{ position: "absolute", bottom: "10px", left: "10px" }}>
      <CssBaseline />
      <Typography variant="body2" color="primary" align="center">
        {"© "}
        <a color="inherit" href="https://github.com/AmossDvir" target="_blank" rel="noreferrer">
          Amoss Dvir
        </a>
        {" All Rights Reserved"}
      </Typography>
    </Box>
  );
};

export default BottomLine;
