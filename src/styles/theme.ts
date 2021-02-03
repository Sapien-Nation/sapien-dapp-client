// mui
import { createMuiTheme } from '@material-ui/core/styles';

// styles
import { avertaBold, avertaItalic, avertaMedium, avertaRegular } from './fonts';

const theme = createMuiTheme({
  palette: {
    type: 'light',
    common: {
      black: '#333333'
    },
    primary: {
      light: '#6200EA',
      main: '#6200EA',
      dark: '#6200EA'
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
    text: {},
    containedSecondary: {
      fontWeight: 700
    }
  },
  MuiInputLabel: {
    root: {
      fontSize: '1.4rem',
      fontWeight: 600
    }
  },
  MuiInput: {
    root: {
      outline: `1px solid transparent`,
      border: `1px solid #ccc`,
      padding: theme.spacing(1, 2),
      borderRadius: '0.6rem',
      minHeight: '4.6rem',
      fontSize: '1.4rem',
      '&$focused': {
        borderRadius: '0.6rem',
        border: `2px solid ${theme.palette.primary.main}`,
        boxSizing: 'border-box',
        outline: `1px solid ${theme.palette.primary.main}`
      }
    },
    input: {
      padding: 0
    }
    // we don't need `focused: {}` with overrides
  }
};

// Global button props
theme.props = {
  MuiButton: {
    disableElevation: true
  },
  MuiInputLabel: {
    shrink: true
  },
  MuiInput: {
    disableUnderline: true
  }
};

export default theme;
