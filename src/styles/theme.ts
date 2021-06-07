// mui
import { createMuiTheme } from '@material-ui/core';
import * as React from 'react';

// styles
import { black, red, primary, darkGrey, gray1, gray2, gray4 } from './colors';
import { avertaBold, avertaItalic, avertaMedium, avertaRegular } from './fonts';

const theme = createMuiTheme({
  spacing: (factor) => `${parseFloat((1 * factor).toFixed(2))}rem`,
  palette: {
    text: {
      primary: black,
    },
    primary: {
      light: '#8133ee',
      main: primary,
      dark: '#4400a3',
      contrastText: '#fff',
    },
    secondary: {
      light: '#d6d6d6',
      main: gray1,
      dark: '#8e8e8e',
      contrastText: '#fff',
    },
    info: {
      main: darkGrey,
      contrastText: '#fff',
    },
    error: {
      light: '#ff6793',
      main: red,
      dark: '#b22e54',
      contrastText: '#fff',
    },
  },
  typography: {
    htmlFontSize: 10,
    fontFamily: ['averta', 'Calibri', 'Arial', 'sans-serif'].join(','),
    h1: {
      fontSize: '3.2rem',
      fontWeight: 600,
      lineHeight: '4.48rem',
    },
    h2: {
      fontSize: '2.2rem',
      fontWeight: 600,
      lineHeight: '3.08rem',
    },
    h3: {
      fontSize: '1.8rem',
      fontWeight: 600,
      lineHeight: '2.52rem',
    },
    subtitle1: { fontSize: '1rem', lineHeight: '1.5rem' },
    subtitle2: {
      fontSize: '1.2rem',
      fontWeight: 400,
      letterSpacing: '0.005em',
      lineHeight: '1.25rem',
    },
    body1: {
      fontSize: '1.8rem',
      fontWeight: 400,
      lineHeight: '2.52rem',
    },
    body2: {
      fontSize: '1.6rem',
      fontWeight: 400,
      lineHeight: '2.24rem',
    },
    button: {
      fontSize: '1.4rem',
      letterSpacing: '0.01em',
      textTransform: 'unset',
      fontWeight: 600,
    },
    caption: {
      fontSize: '1.2rem',
      color: black,
      fontWeight: 700,
      letterSpacing: '0.01em',
      lineHeight: '1.05rem',
    },
    overline: {
      color: gray2,
      fontWeight: 700,
      letterSpacing: '0.5px',
      lineHeight: '1rem',
    },
  },
});

theme.components = {
  MuiCssBaseline: {
    styleOverrides: {
      html: {
        WebkitFontSmoothing: 'auto',
        fontSize: '62.5%',
      },
      body: {
        overscrollBehaviorY: 'none',
      },
      '*, *::before, *::after': {
        transition: 'none !important',
        animation: 'none !important',
      },
      '@font-face': [
        avertaBold,
        avertaItalic,
        avertaMedium,
        avertaRegular,
      ] as unknown as React.CSSProperties,
    },
  },
  MuiDialog: {
    styleOverrides: {
      paper: {
        borderRadius: '1rem',
        width: '100%',
      },
      paperWidthXs: {
        maxWidth: '49rem',
        width: '100%',
      },
      paperWidthSm: {
        maxWidth: '51.8rem',
        width: '100%',
      },
    },
  },
  MuiDialogTitle: {
    styleOverrides: {
      root: {
        padding: 0,
        '&> h2': {
          fontWeight: 600,
          fontSize: '2.2rem',
        },
      },
    },
  },
  MuiDialogContent: {
    styleOverrides: {
      root: {
        padding: '1rem 5rem',
      },
    },
  },
  MuiDialogActions: {
    styleOverrides: {
      root: {
        padding: '1rem 5rem 5rem 5rem',
      },
    },
  },
  MuiButton: {
    defaultProps: {
      disableRipple: true,
      disableElevation: true,
    },
    styleOverrides: {
      root: {
        borderRadius: '0.6rem',
        textTransform: 'none',
        minHeight: '4rem',
        minWidth: '8rem',
        fontWeight: 600,
      },
      containedSecondary: {
        fontWeight: 700,
      },
    },
  },
  MuiFormLabel: {
    styleOverrides: {
      asterisk: {
        display: 'none',
      },
    },
  },
  MuiInputLabel: {
    defaultProps: {
      shrink: true,
    },
    styleOverrides: {
      root: {
        fontSize: '1.4rem',
        fontWeight: 600,
        transform: 'translate(0, 0) scale(1)',
        color: black,
        position: 'relative',
        top: '-1rem',
      },
      shrink: {
        transform: 'translate(0, 0) scale(1)',
      },
      formControl: {
        position: 'static',
      },
    },
  },
  MuiFormControl: {
    styleOverrides: {
      root: {
        marginBottom: `${theme.spacing(2.8)}`,
      },
    },
  },
  MuiInput: {
    defaultProps: {
      disableUnderline: true,
    },
    styleOverrides: {
      root: {
        border: `2px solid transparent`,
        background: darkGrey,
        padding: theme.spacing(1, 2),
        borderRadius: '0.6rem',
        minHeight: '4.6rem',
        fontSize: '1.4rem',
        '&$focused': {
          borderRadius: '0.6rem',
          border: `2px solid ${primary}`,
          boxSizing: 'border-box',
        },
      },
      formControl: {
        'label + &': {
          marginTop: theme.spacing(1.6),
        },
      },
      input: {
        padding: 0,
      },
      inputTypeSearch: {
        '&::-webkit-search-decoration': {
          WebkitAppearance: 'none',
        },
        '&::-webkit-search-cancel-button': {
          WebkitAppearance: 'none',
        },
        '&::-webkit-search-results-button': {
          WebkitAppearance: 'none',
        },
        '&::-webkit-search-results-decoration': {
          WebkitAppearance: 'none',
        },
      },
    },
  },
  MuiOutlinedInput: {
    styleOverrides: {
      root: {
        background: gray4,
        borderRadius: '0.6rem',
        fontSize: '1.4rem',
        minHeight: '4.6rem',
        input: {
          padding: theme.spacing(1, 2),
        },
        fieldset: {
          borderWidth: 0,
          top: '-2px',
          legend: {
            display: 'none',
          },
        },
      },
    },
  },
  MuiInputAdornment: {
    styleOverrides: {
      positionStart: {
        color: darkGrey,
      },
    },
  },
  MuiInputBase: {
    styleOverrides: {
      inputAdornedStart: {
        paddingLeft: '0.5rem',
      },
      inputAdornedEnd: {
        paddingRight: '0.5rem',
      },
      adornedStart: {
        paddingLeft: '2rem !important',
      },
      adornedEnd: {
        paddingRight: '2rem !important',
      },
      multiline: {
        padding: `${theme.spacing(1, 2)} !important`,
      },
    },
  },
  MuiSwitch: {
    defaultProps: {
      disableRipple: true,
    },
    styleOverrides: {
      root: {
        width: 38,
        height: 20,
        padding: 0,
      },
      switchBase: {
        padding: 2,
        '&.Mui-checked': {
          color: theme.palette.common.white,
          transform: 'translateX(18px)',
          '& + .MuiSwitch-track': {
            opacity: 1,
          },
        },
      },
      thumb: {
        width: 15,
        height: 15,
      },
      track: {
        borderRadius: 26 / 2,
        border: `1px solid ${gray4}`,
        backgroundColor: '#F4F7F9',
        opacity: 1,
        transition: theme.transitions.create(['background-color', 'border']),
      },
      checked: {},
    },
  },
};

export default theme;
