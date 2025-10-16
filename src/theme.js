import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  // shadows: ["none"],
  shadows: [
    "none", // 0
    "0px 1px 3px rgba(0,0,0,0.2)", // 1
    "0px 2px 4px rgba(0,0,0,0.2)", // 2
    "0px 3px 6px rgba(0,0,0,0.2)", // 3
    "0px 4px 8px rgba(0,0,0,0.2)", // 4
    "0px 5px 10px rgba(0,0,0,0.2)", // 5
    "0px 6px 12px rgba(0,0,0,0.2)", // 6
    "0px 7px 14px rgba(0,0,0,0.2)", // 7
    "0px 8px 16px rgba(0,0,0,0.15)", // 8
    // ...
    "0px 24px 38px rgba(0,0,0,0.3)", // 24
  ],
  palette: {
    primary: {
      main: "#4361ee",
    },
  },
  typography: {
    button: {
      textTransform: "none",
      fontWeight: 400,
    },
  },
});

// export const theme = createTheme(); // standart shadows 0–24
