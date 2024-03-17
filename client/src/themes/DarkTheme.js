import { createTheme } from '@mui/material/styles';

// Define the theme options for the dark mode
const darkThemeOptions = {
    palette: {
        mode: 'dark', // Set the mode to 'dark'
        primary: {
            main: '#386641',
        },
        secondary: {
            main: '#bc4749',
        },
        error: {
            main: '#d32f2f',
        },
        info: {
            main: '#0288d1',
        },
        success: {
            main: '#6a994e',
        },
    },
    typography: {
        h1: {
            fontFamily: 'Barlow Condensed',
        },
        h2: {
            fontFamily: 'Barlow Condensed',
        },
        h3: {
            fontFamily: 'Barlow Condensed',
        },
        h4: {
            fontFamily: 'Barlow Condensed',
        },
        h5: {
            fontFamily: 'Barlow Condensed',
        },
        h6: {
            fontFamily: 'Barlow Condensed',
        },
        subtitle1: {
            fontFamily: 'Montserrat',
        },
        subtitle2: {
            fontFamily: 'Montserrat',
        },
        body1: {
            fontFamily: 'Montserrat',
        },
        body2: {
            fontFamily: 'Montserrat',
        },
        button: {
            fontFamily: 'Barlow Condensed',
        },
        caption: {
            fontFamily: 'Montserrat',
        },
        overline: {
            fontFamily: 'Montserrat',
        },
    },
};

export const darkTheme = createTheme(darkThemeOptions);
