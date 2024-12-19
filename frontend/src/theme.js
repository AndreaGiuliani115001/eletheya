import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        background: {
            default: '#f5f5f5', // Imposta il colore di sfondo globale
        },
        primary: {
            main: '#1976d2', // Colore primario
        },
        secondary: {
            main: '#dc004e', // Colore secondario
        },
    },
    typography: {
        fontFamily: 'Roboto, Arial, sans-serif',
    },
});

export default theme;
