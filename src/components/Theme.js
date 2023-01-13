import { createTheme } from '@material-ui/core/styles';

export const Theme = createTheme({
    palette:{
        primary: {
          main: 'rgb(142, 36, 170)',
          light:'rgb(142, 36, 170, 0.2)',
          dark: '#7b1fa2'
        },
        mode:'dark',
        secondary: {
          main: '#ffa726',
        },
        neutral: {
          main: '#bfc5cc',
          dark: '#aeb5bd',
          light: '#d5dce3',
          lightest:'#efefef',
          contrastText: '#fff',
        },
        songlist:{
          main: '#bfc5cc'
        }
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