// mui
import { createMuiTheme } from '@material-ui/core/styles';

// styles
import {
  black,
  green,
  purple,
  darker,
  darkGrey,
  inputBG,
  lightGrey
} from './colors';
import { avertaBold, avertaItalic, avertaMedium, avertaRegular } from './fonts';

const theme = createMuiTheme({
  spacing: (factor) => `${parseFloat((0.8 * factor).toFixed(2))}rem`,
  palette: {
    type: 'light',
    common: {
      black: black
    },
    primary: {
      light: purple,
      main: purple,
      dark: purple
    },
    formLabel: {
      light: black,
      main: black,
      dark: black
    },
    caption: {
      light: darkGrey,
      main: darkGrey,
      dark: darkGrey
    },
    input: {
      light: inputBG,
      main: inputBG,
      dark: inputBG
    },
    infoIcon: {
      light: lightGrey,
      main: lightGrey,
      dark: lightGrey
    }
  },
  typography: {
    htmlFontSize: 10,
    fontFamily: ['averta', 'Calibri', 'Arial', 'sans-serif'].join(',')
  }
});

// Override default styles
theme.overrides = {
  MuiCssBaseline: {
    '@global': {
      html: {
        WebkitFontSmoothing: 'auto',
        fontSize: '62.5%'
      },
      '@font-face': ([
        avertaBold,
        avertaItalic,
        avertaMedium,
        avertaRegular
      ] as unknown) as React.CSSProperties
    }
  },
  MuiDialogTitle: {
    root: {
      padding: '5rem 5rem 0 5rem'
    }
  },
  MuiDialogContent: {
    root: {
      padding: '1rem 5rem'
    }
  },
  MuiDialogActions: {
    root: {
      padding: '1rem 5rem 5rem 5rem'
    }
  },
  MuiButton: {
    root: {
      borderRadius: '0.6rem',
      textTransform: 'none',
      minHeight: '4rem',
      minWidth: '8rem',
      fontWeight: 600
    },
    containedSecondary: {
      fontWeight: 700
    }
  },
  MuiInputLabel: {
    root: {
      fontSize: '1.4rem',
      fontWeight: 600,
      transform: 'translate(0, 0) scale(1)',
      color: theme.palette.formLabel.main
    },
    shrink: {
      transform: 'translate(0, 0) scale(1)'
    },
    formControl: {
      position: 'static'
    }
  },
  MuiFormControl: {
    root: {
      marginBottom: `${theme.spacing(3)}`
    }
  },
  MuiInput: {
    root: {
      border: `2px solid transparent`,
      background: theme.palette.input.main,
      padding: theme.spacing(1, 2),
      borderRadius: '0.6rem',
      minHeight: '4.6rem',
      fontSize: '1.4rem',
      '&$focused': {
        borderRadius: '0.6rem',
        border: `2px solid ${theme.palette.primary.main}`,
        boxSizing: 'border-box'
      }
    },
    formControl: {
      'label + &': {
        marginTop: theme.spacing(3)
      }
    },
    input: {
      padding: 0
    }
  },
  MuiTypography: {
    caption: {
      color: theme.palette.caption.main
    },
    h2: {
      fontSize: '2.2rem',
      fontWeight: 600
    }
  },
  MuiInputAdornment: {
    positionStart: {
      color: theme.palette.caption.main
    }
  },
  MuiSwitch: {
    root: {
      width: 38,
      height: 20,
      padding: 0
    },
    switchBase: {
      padding: 2,
      '&$checked': {
        transform: 'translateX(18px)',
        color: theme.palette.common.white,
        '& + $track': {
          backgroundColor: green,
          opacity: 1,
          border: 'none'
        }
      }
    },
    thumb: {
      width: 15,
      height: 15
    },
    track: {
      borderRadius: 26 / 2,
      border: `1px solid ${theme.palette.input.main}`,
      backgroundColor: darker,
      opacity: 1,
      transition: theme.transitions.create(['background-color', 'border'])
    },
    checked: {}
  }
};

// Global button props
theme.props = {
  MuiIconButton: {
    disableRipple: true
  },
  MuiButton: {
    disableRipple: true,
    disableElevation: true
  },
  MuiInputLabel: {
    shrink: true
  },
  MuiInput: {
    disableUnderline: true
  },
  MuiSwitch: {
    disableRipple: true
  }
};

export default theme;
