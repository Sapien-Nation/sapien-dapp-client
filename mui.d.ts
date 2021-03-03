import '@material-ui/core/styles/createPalette';

declare module '@material-ui/core/styles/createPalette' {
  interface Palette {
    input?: PaletteColor;
    formLabel?: PaletteColor;
    caption?: PaletteColor;
    infoIcon?: PaletteColor;
  }
  interface PaletteOptions {
    input?: PaletteColorOptions;
    formLabel?: PaletteColorOptions;
    caption?: PaletteColorOptions;
    infoIcon?: PaletteColorOptions;
  }
}