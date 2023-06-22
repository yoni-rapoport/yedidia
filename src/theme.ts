import { createTheme } from "@mui/material"
import { blue } from "@mui/material/colors"

const theme = createTheme({
  components: {
    MuiListItemButton: {},
  },
  palette: {
    primary: {
      main: blue[600],
    },
  },
})
export default theme
