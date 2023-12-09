import { Typography, Box, CssBaseline } from "@material-ui/core";

const BottomLine = () => {
  return (
    <Box mt={5} sx={{ position: "absolute", bottom: "10px", left: "10px" }}>
      <CssBaseline />
      <div style={{display:'flex', flexDirection:'col', fontSize:'10px'}}>
        <a
          style={{fontSize:'10px'}}
          color="inherit"
          href="https://github.com/AmossDvir"
          target="_blank"
          rel="noreferrer"
        >
         {"© Amoss Dvir"} 
        </a>
        <div style={{fontSize:'10px', display: 'flex'}}>{" All Rights Reserved"}</div>
      </div>
    </Box>
  );
};

export default BottomLine;
