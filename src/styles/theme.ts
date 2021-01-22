// mui
import { createMuiTheme } from '@material-ui/core/styles';
import { avertaBold, avertaItalic, avertaMedium, avertaRegular } from './fonts';

const theme = createMuiTheme({
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
    }
  }
});

export default theme;
