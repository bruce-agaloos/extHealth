// theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: 'Roboto Flex, Arial, sans-serif',
    h1: {
      fontFamily: 'Lexend, Arial, sans-serif',
    },
    h2: {
      fontFamily: 'Lexend, Arial, sans-serif',
    },
    h3: {
      fontFamily: 'Lexend, Arial, sans-serif',
    },
    h4: {
      fontFamily: 'Lexend, Arial, sans-serif',
    },
    h5: {
      fontFamily: 'Lexend, Arial, sans-serif',
    },
    h6: {
      fontFamily: 'Lexend, Arial, sans-serif',
    }
  },
  components: {
    MuiLink: {
      styleOverrides: {
        root: {
          color: '#797DCF', // Set the color for links
          textDecoration: 'none', // Remove underline
          '&:hover': {
            textDecoration: 'underline', // Optional: underline on hover
          },
        },
      },
    },
  },
});

export default theme;
