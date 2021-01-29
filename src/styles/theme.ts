// mui
import { createMuiTheme } from '@material-ui/core/styles';

// styles
import { avertaBold, avertaItalic, avertaMedium, avertaRegular } from './fonts';

const theme = createMuiTheme({
  palette: {
    common: {
      black: '#333333'
    },
    primary: {
      main: '#6200EA'
    }
  },
  typography: {
    htmlFontSize: 10,
    fontFamily: ['averta', 'Calibri', 'Arial', 'sans-serif'].join(',')
  },
  overrides: {
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
    }
  }
});

// Global button props
theme.props = {
  MuiButton: {
    disableElevation: true
  }
};

export default theme;
