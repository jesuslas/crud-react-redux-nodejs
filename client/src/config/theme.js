import { blue800 } from "@material-ui/core/colors/purple";
import { fontFamily } from "./config";

export const themeConfig = {
  typography: {
    fontFamily: [fontFamily].join(","),
    fontWeight: 400,
    fontSize: 12
  },
  palette: {
    primary: {
      main: "#e3263f"
    },
    secondary: {
      main: "#E96723"
    },
    error: {
      main: "#f44336"
    },
    warning: {
      main: "#ff9800"
    },
    info: {
      light: "#4e75ac",
      main: "#174A7C",
      dark: "#00234f",
      contrastText: "#fff"
    },
    success: {
      main: "#174A7C"
    },
    default: {
      main: "#000000"
    },
    inherit: {
      light: "#ffffff",
      main: "#fff",
      dark: "#cccccc"
    },
    background: {
      default: "#EDF0F5"
    },
    tabs: {
      backgroundColor: blue800
    }
  },
  overrides: {
    MuiInputBase: {
      input: {
        "&:-webkit-autofill": {
          transitionDelay: "9999s",
          transitionProperty: "background-color, color"
        }
      }
    }
  }
};
