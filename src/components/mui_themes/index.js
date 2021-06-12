import { createMuiTheme } from "@material-ui/core/styles";
import purple from "@material-ui/core/colors/purple";
import green from "@material-ui/core/colors/green";

const theme = createMuiTheme({
  typography: {
    fontFamily: "Poppins",
    fontSize: 12,
    fontWeight: 300,
    lineHeight: "1.5em",
  },
  palette: {
    primary: {
      main: "#191d49",
    },
    secondary: {
      main: "#00d8ad",
    },
  },
});

export default theme;
