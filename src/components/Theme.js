import { createTheme } from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors';

export const Theme = createTheme({
    palette: {
        primary: deepPurple,
        mode:"dark"
    }, 
    typography: {
        fontFamily: 'Jost',
        fontWeightLight:200,
        fontWeightRegular:200,
        fontWeightMedium:400,
        fontWeightBold:600,
        fontSize:18,
        button: {
            textTransform: 'none'
          }


    }
});