import { createTheme } from '@material-ui/core/styles';
import { lightGreen } from '@material-ui/core/colors';

export const Theme = createTheme({
    palette: {
        primary: lightGreen
    }, 
    typography: {
        fontFamily: 'Jost',
        fontWeightLight:200,
        fontWeightRegular:300,
        fontWeightMedium:500,
        fontWeightBold:600,


    }
});