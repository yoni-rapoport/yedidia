import { createTheme } from "@mui/material"
import { grey } from "@mui/material/colors"

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
          ":disabled": {
            background: "#007B1B",
            opacity: 0.4000000059604645,
            color: grey["A100"],
          },
        },
        outlined: {
          borderColor: "#979797",
          color: "#3F5A8D",
          fontSize: "20px",
          borderRadius: "2rem",
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
    success: {
      main: "#007B1B",
    },
  },
})
export default theme
