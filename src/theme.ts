import { createTheme } from "@mui/material"

const theme = createTheme({
  direction: "rtl",
  typography: {
    fontFamily: ["Rubik"].join(","),
  },
  components: {
    MuiListItemButton: {},
    MuiButton: {
      styleOverrides: {
        contained: {
          background: "#009E22",
          fontSize: "20px",
          borderRadius: "2rem",
          width: "123px",
        },
        outlined: {
          borderColor: "#979797",
          color: "#3F5A8D",
          fontSize: "20px",
          borderRadius: "2rem",
          width: "123px",
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          fontSize: "20px",
          color: "#1D1B20",
          fontWeight: 400,
          lineHeight: "24px",
        },
      },
    },
  },
  palette: {
    primary: {
      main: "#488EBD",
    },
  },
})
export default theme
