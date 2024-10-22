import * as PaletteColorOptions from '@mui/material/styles/createPalette'

declare module '@mui/material/styles/createPalette' {
  interface PaletteOptions {
    cancel?: PaletteColorOptions
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    cancel: true
  }
}
