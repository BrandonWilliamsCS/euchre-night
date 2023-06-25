import { createTheme } from "@mui/material";

export const colors = {
  forest: "#1D4F1A",
  pepper: "#0D1C0C",
  field: "#8FC943",
  honeysuckle: "#EAEA59",
  morningMist: "#E6EDF4",
  grey: "#ABABAB",
  white: "#FFFFFF",
  scarlet: "#FF2400",
  salmon: "#FF7B69",
};

export const appTheme = createTheme({
  spacing: 4,
  shape: { borderRadius: 0 },
  palette: {
    primary: { main: colors.honeysuckle, contrastText: colors.pepper },
    secondary: { main: colors.field, contrastText: colors.pepper },
    background: { default: colors.forest, paper: colors.pepper },
    error: { main: colors.salmon, contrastText: colors.pepper },
    text: { primary: colors.white },
  },
  typography: {
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    pop: { fontSize: "4.5rem", lineHeight: "normal" },
    body1: { fontSize: "1.5rem", lineHeight: "2.25rem" },
    body2: { fontSize: "1.125rem", lineHeight: "1.68rem" },
    caption: { fontSize: "1.3125rem", lineHeight: "2rem" },
  },
  components: {
    MuiButton: {
      defaultProps: { variant: "contained" },
      styleOverrides: {
        root: {
          textTransform: "none",
          boxShadow: "0px 7px 10px rgba(13, 28, 12, .5)",
          ":hover, :focus, :active": {
            boxShadow: "0px 2px 5px rgba(13, 28, 12, .8)",
          },
        },
        text: {
          boxShadow: "none",
          ":hover, :focus, :active": {
            boxShadow: "none",
          },
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: colors.field,
        },
      },
    },
  },
});
