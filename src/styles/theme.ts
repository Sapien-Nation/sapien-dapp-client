// mui
import { createMuiTheme } from '@material-ui/core';
import * as React from 'react';

// styles
import { green, neutral, red, primary, secondary } from './colors';
import { avertaBold, avertaItalic, avertaMedium, avertaRegular } from './fonts';

const theme = createMuiTheme({
  spacing: (factor) => `${parseFloat((1 * factor).toFixed(2))}rem`,
  props: {
    MuiButton: {
      disableRipple: true,
      disableElevation: true,
    },
    MuiInputLabel: {
      shrink: true,
    },
    MuiInput: {
      disableUnderline: true,
    },
    MuiSwitch: {
      disableRipple: true,
    },
    MuiTypography: {
      variantMapping: {
        h5: 'p',
        h6: 'p',
        subtitle1: 'button',
        subtitle2: 'button',
        h4: 'button',
      },
    },
  },
  palette: {
    text: {
      primary: neutral[700],
      secondary: neutral[500],
    },
    primary: {
      light: primary[800],
      main: primary[800],
      dark: primary[900],
      contrastText: '#fff',
      ...primary,
    },
    secondary: {
      light: secondary[800],
      main: secondary[800],
      dark: secondary[900],
      contrastText: '#fff',
      ...secondary,
    },
    info: {
      main: neutral[500],
      contrastText: '#fff',
    },
    action: {
      active: neutral[500],
    },
    error: {
      light: red[700],
      main: red[700],
      dark: red[800],
      contrastText: '#fff',
      ...red,
    },
    success: {
      light: green[700],
      main: green[700],
      dark: green[800],
      contrastText: '#fff',
      ...green,
    },
    grey: {
      ...neutral,
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
    h5: {
      // Body3
      fontSize: '1.5rem',
      lineHeight: '140%',
    },
    h6: {
      // Body 4/ Input Text
      fontSize: '1.4rem',
      lineHeight: '140%',
    },
    subtitle1: {
      // Button Large
      fontSize: '1.6rem',
      fontWeight: 600,
    },
    button: {
      // Button Medium
      fontSize: '1.4rem',
      textTransform: 'none',
      fontWeight: 600,
    },
    subtitle2: {
      // Button SemiMedium
      fontSize: '1.3rem',
      fontWeight: 600,
    },
    h4: {
      // Button small
      fontSize: '1.2rem',
      fontWeight: 600,
    },
    caption: {
      fontSize: '1.2rem',
      fontWeight: 'bold',
      letterSpacing: '0.05rem',
      lineHeight: '1.05rem',
    },
    overline: {
      // Tooltip/Helper Text/ Additional Info
      fontSize: '1.2rem',
      textTransform: 'none',
    },
  },
});

theme.overrides = {
  MuiCssBaseline: {
    '@global': {
      html: {
        WebkitFontSmoothing: 'auto',
        fontSize: '62.5%',
      },
      body: {
        overscrollBehaviorY: 'none',
      },
      '@font-face': [
        avertaBold,
        avertaItalic,
        avertaMedium,
        avertaRegular,
      ] as unknown as React.CSSProperties,
    },
  },
  MuiAvatar: {
    img: {
      backgroundColor: '#FFFFFF',
    },
  },
  MuiDialog: {
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
  MuiDialogTitle: {
    root: {
      padding: 0,
      '&> h2': {
        fontWeight: 600,
        fontSize: '2.2rem',
      },
    },
  },
  MuiDialogContent: {
    root: {
      padding: '1rem 5rem',
    },
  },
  MuiDialogActions: {
    root: {
      padding: '1rem 5rem 5rem 5rem',
    },
  },
  MuiButton: {
    root: {
      borderRadius: '0.6rem',
      textTransform: 'none',
      minHeight: '4rem',
      minWidth: '6rem',
      fontWeight: 600,
      fontSize: '1.4rem',
    },
    containedSecondary: {
      fontWeight: 700,
    },
    sizeLarge: {
      fontSize: '1.6rem',
      fontWeight: 600,
    },
    sizeSmall: {
      fontSize: '1.2rem',
      fontWeight: 600,
      minHeight: '3.2',
    },
  },
  MuiInputLabel: {
    root: {
      fontSize: '1.4rem',
      fontWeight: 600,
      transform: 'translate(0, 0) scale(1)',
      color: neutral[700],
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
  MuiFormControl: {
    root: {
      marginBottom: `${theme.spacing(0.5)}`,
    },
  },
  MuiFormHelperText: {
    root: {
      height: `${theme.spacing(2)}`,
    },
  },
  MuiFormLabel: {
    root: {
      color: neutral[700],
      '&$focused': {
        color: neutral[700],
      },
      '&.Mui-error': {
        color: neutral[700],
      },
    },
  },
  MuiInput: {
    root: {
      border: `2px solid transparent`,
      background: 'rgba(143, 146, 161, 0.05)',
      padding: theme.spacing(1, 2),
      borderRadius: '0.6rem',
      minHeight: '4.6rem',
      fontSize: '1.4rem',
      '&$focused': {
        borderRadius: '0.6rem',
        border: `2px solid ${primary}`,
        boxSizing: 'border-box',
      },
      '&.Mui-error': {
        backgroundColor: '#FEF9F9',
        border: `2px solid ${red[700]} !important`,
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
  MuiOutlinedInput: {
    root: {
      background: neutral[50],
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
  MuiInputAdornment: {
    positionStart: {
      color: neutral[500],
    },
  },
  MuiInputBase: {
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
  MuiSwitch: {
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
      border: `1px solid ${neutral[50]}`,
      backgroundColor: '#F4F7F9',
      opacity: 1,
      transition: theme.transitions.create(['background-color', 'border']),
    },
    checked: {},
  },
  MuiTooltip: {
    tooltip: {
      backgroundColor: '#fff',
      color: '#8F92A1',
      fontSize: '1.2rem',
    },
  },
};

export default theme;
