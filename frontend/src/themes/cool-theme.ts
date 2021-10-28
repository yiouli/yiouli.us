import { createTheme } from '@mui/material/styles';
import { green, grey, red } from '@mui/material/colors';
import { color } from '@mui/system';

const lightPalette = {
  mode: 'light',
  primary: {
    light: '#484848',
    main: '#212121',
    dark: '#000000',
    contrastText: '#ffffff',
  },
  secondary: {
    light: '#fc548e',
    main: '#c41061',
    dark: '#8e0038',
    contrastText: '#ffffff',
  }
}

const darkPalette = {
  mode: 'dark',
  primary: {
    light: '#ffffff',
    main: '#ede7f6',
    dark: '#bbb5c3',
  },
  secondary: {...lightPalette.secondary},
  background: {
    paper: '#212121',
    default: '#000000',
  },
  text: {
    primary: '#fff',
    secondary: 'rgba(255, 255, 255, 0.7)',
    disabled: 'rgba(255, 255, 255, 0.5)',
    icon: 'rgba(255, 255, 255, 0.5)',
  }
}

const rawTheme = createTheme({
  palette: {
    primary: {
      light: '#484848',
      main: '#212121',
      dark: '#000000',
      contrastText: '#ffffff',
    },
  },
  typography: {
    fontFamily: "'Work Sans', sans-serif",
    fontSize: 14,
    fontWeightLight: 300, // Work Sans
    fontWeightRegular: 400, // Work Sans
    fontWeightMedium: 700, // Roboto Condensed
  },
});

const fontHeader = {
  color: rawTheme.palette.text.primary,
  fontWeight: rawTheme.typography.fontWeightMedium,
  fontFamily: "'Roboto Condensed', sans-serif",
  textTransform: 'uppercase',
};

const coolTheme = {
  ...rawTheme,
  palette: {
    ...rawTheme.palette,
  },
  typography: {
    ...rawTheme.typography,
    fontHeader,
    h1: {
      ...rawTheme.typography.h1,
      ...fontHeader,
      letterSpacing: 0,
      fontSize: 60,
    },
    h2: {
      ...rawTheme.typography.h2,
      ...fontHeader,
      fontSize: 48,
    },
    h3: {
      ...rawTheme.typography.h3,
      ...fontHeader,
      fontSize: 42,
    },
    h4: {
      ...rawTheme.typography.h4,
      ...fontHeader,
      fontSize: 36,
    },
    h5: {
      ...rawTheme.typography.h5,
      fontSize: 20,
      fontWeight: rawTheme.typography.fontWeightLight,
    },
    h6: {
      ...rawTheme.typography.h6,
      ...fontHeader,
      fontSize: 18,
    },
    subtitle1: {
      ...rawTheme.typography.subtitle1,
      fontSize: 18,
    },
    body1: {
      ...rawTheme.typography.body2,
      fontWeight: rawTheme.typography.fontWeightRegular,
      fontSize: 16,
    },
    body2: {
      ...rawTheme.typography.body1,
      fontSize: 14,
    },
  },
};

export const coolDarkTheme = {
  ...coolTheme,
  palette: {
    ...coolTheme.palette,
    ...darkPalette,
  },
}

export default coolTheme;
