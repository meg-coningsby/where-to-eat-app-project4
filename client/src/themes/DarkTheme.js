import { createTheme } from '@mui/material/styles';

export const themeOptions = {
    palette: {
        mode: 'dark',
        primary: {
            main: '#386641',
        },
        secondary: {
            main: '#6a994e',
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

export const darkTheme = createTheme(themeOptions);
