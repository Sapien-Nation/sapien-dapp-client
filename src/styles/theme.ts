// mui
import { createMuiTheme } from '@material-ui/core';
import * as React from 'react';

// styles
import {
  red,
  black,
  green,
  purple,
  darker,
  darkGrey,
  inputBG,
  lightGrey,
} from './colors';
import { avertaBold, avertaItalic, avertaMedium, avertaRegular } from './fonts';

declare module '@material-ui/core/styles' {
  interface TypographyVariants {
    body3: React.CSSProperties;
    body4: React.CSSProperties;
    buttonLarge: React.CSSProperties;
    buttonMedium: React.CSSProperties;
    buttonSemiMedium: React.CSSProperties;
    buttonSmall: React.CSSProperties;
    caption: React.CSSProperties;
    captionItem: React.CSSProperties;
    tooltip: React.CSSProperties;
  }

  // allow configuration using `createMuiTheme`
  interface TypographyVariantsOptions {
    body3?: React.CSSProperties;
    body4?: React.CSSProperties;
    buttonLarge?: React.CSSProperties;
    buttonMedium?: React.CSSProperties;
    buttonSemiMedium?: React.CSSProperties;
    buttonSmall?: React.CSSProperties;
    caption?: React.CSSProperties;
    captionItem?: React.CSSProperties;
    tooltip?: React.CSSProperties;
  }
}

// Update the Typography's variant prop options
declare module '@material-ui/core/Typography' {
  interface TypographyPropsVariantOverrides {
    body3: true;
    body4: true;
    buttonLarge: true;
    buttonMedium: true;
    buttonSemiMedium: true;
    buttonSmall: true;
    caption: true;
    captionItem: true;
    tooltip: true;
  }
}

const theme = createMuiTheme({
  spacing: (factor) => `${parseFloat((1 * factor).toFixed(2))}rem`,
  palette: {
    // type: 'light',
    common: {
      black: black,
    },
    primary: {
      light: purple,
      main: purple,
      dark: purple,
    },
    // @ts-ignore
    formLabel: {
      light: black,
      main: black,
      dark: black,
    },
    caption: {
      light: darkGrey,
      main: darkGrey,
      dark: darkGrey,
    },
    input: {
      light: inputBG,
      main: inputBG,
      dark: inputBG,
    },
    infoIcon: {
      light: lightGrey,
      main: lightGrey,
      dark: lightGrey,
    },
    error: {
      light: red,
      main: red,
      dark: red,
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
    body3: {
      fontSize: '1.2rem',
      fontWeight: 400,
      lineHeight: '2.1rem',
    },
    body4: {
      fontSize: '1.4rem',
      fontWeight: 400,
      lineHeight: '1.96rem',
    },
    buttonLarge: {
      fontSize: '1.6rem',
      fontWeight: 600,
      lineHeight: '2.24rem',
    },
    buttonMedium: {
      fontSize: '1.4rem',
      fontWeight: 600,
      lineHeight: '1.96rem',
    },
    buttonSemiMedium: {
      fontSize: '1.3rem',
      fontWeight: 600,
      lineHeight: '1.82rem',
    },
    buttonSmall: {
      fontSize: '1.2rem',
      fontWeight: 600,
      lineHeight: '1.68rem',
    },
    caption: {
      fontSize: '1.2rem',
      fontWeight: 700,
      lineHeight: '1.68rem',
    },
    captionItem: {
      fontSize: '1.2rem',
      fontWeight: 700,
      lineHeight: '1.68rem',
      letterSpacing: '1px',
      textTransform: 'uppercase',
      color: darkGrey,
    },
    tooltip: {
      fontSize: '1.2rem',
      fontWeight: 400,
      lineHeight: '1.68rem',
    },
  },
});

// Override default styles
theme.components = {
  MuiCssBaseline: {
    styleOverrides: {
      html: {
        WebkitFontSmoothing: 'auto',
        fontSize: '62.5%',
      },
      '@font-face': ([
        avertaBold,
        avertaItalic,
        avertaMedium,
        avertaRegular,
      ] as unknown) as React.CSSProperties,
    },
  },
  MuiListItem: {
    styleOverrides: {
      root: {
        paddingTop: 0,
        paddingBottom: 0,
      },
      button: {
        '&:hover': {
          backgroundColor: 'transparent',
        },
      },
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
  MuiInputLabel: {
    defaultProps: {
      shrink: true,
    },
    styleOverrides: {
      root: {
        fontSize: '1.4rem',
        fontWeight: 600,
        transform: 'translate(0, 0) scale(1)',
        color: (theme as any).palette.formLabel.main,
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
        marginBottom: `${theme.spacing(1.6)}`,
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
        background: (theme as any).palette.input.main,
        padding: theme.spacing(1, 2),
        borderRadius: '0.6rem',
        minHeight: '4.6rem',
        fontSize: '1.4rem',
        '&$focused': {
          borderRadius: '0.6rem',
          border: `2px solid ${(theme as any).palette.primary.main}`,
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
    inputTypeSearch: {
      '&::-webkit-search-decoration': {
        '-webkit-appearance': 'none',
      },
      '&::-webkit-search-cancel-button': {
        '-webkit-appearance': 'none',
      },
      '&::-webkit-search-results-button': {
        '-webkit-appearance': 'none',
      },
      '&::-webkit-search-results-decoration': {
        '-webkit-appearance': 'none',
      },
    },
  },
  MuiInputAdornment: {
    styleOverrides: {
      positionStart: {
        color: (theme as any).palette.caption.main,
      },
    },
  },
  MuiInputBase: {
    styleOverrides: {
      adornedStart: {
        padding: '1rem !important',
      },
      adornedEnd: {
        padding: '1rem !important',
      },
    },
  },
  MuiFab: {
    styleOverrides: {
      root: {
        boxShadow: 'none',
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
        '&$checked': {
          transform: 'translateX(18px)',
          color: theme.palette.common.white,
          '& + $track': {
            backgroundColor: green,
            opacity: 1,
            border: 'none',
          },
        },
      },
      thumb: {
        width: 15,
        height: 15,
      },
      track: {
        borderRadius: 26 / 2,
        border: `1px solid ${(theme as any).palette.input.main}`,
        backgroundColor: darker,
        opacity: 1,
        transition: theme.transitions.create(['background-color', 'border']),
      },
      checked: {},
    },
  },
  MuiSelect: {
    styleOverrides: {
      select: {
        '&:focus': {
          backgroundColor: 'none',
        },
      },
    },
  },
  MuiIconButton: {
    defaultProps: {
      disableRipple: true,
    },
  },
  MuiTab: {
    defaultProps: {
      disableRipple: true,
    },
  },
};

export default theme;
