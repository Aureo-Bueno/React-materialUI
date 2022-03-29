import { createTheme } from '@mui/material';
import {yellow} from '@mui/material/colors'

export const LightTheme = createTheme({
    palette:{
        primary: {
            main: yellow[700],
            dark: yellow[800],
            light: yellow[500],
            contrastText: '#ffffff',
        },
        secondary:{
            main: yellow[500],
            dark: yellow[400],
            light: yellow[300],
            contrastText: '#ffffff',
        },
        background:{
            default: '#ffffff',
            paper: '#f7f6f3',
        }
    }
});