import { createTheme } from '@mui/material/styles';

export const themeOptions = {
    palette: {
        mode: 'light',
        primary: {
            main: '#386641',
        },
        secondary: {
            main: '#6A994E',
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
};

export const lightTheme = createTheme(themeOptions);
