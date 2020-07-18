import { createMuiTheme } from "@material-ui/core/styles";
import { green, grey, red } from "@material-ui/core/colors";

const darkRed = "#ff3422"
const gold = "#835A00"
const lightBlue = "#051e3e"
const darkBlue = "#628078"
const appleGrey = "#999999"
const darkBlack = "#000000"

export default createMuiTheme({
  palette: {
    common: {
      darkRed: `${darkRed}`,
      darkGold: `${gold}`,
      darkBlue: `${darkBlue}`,
      appleGrey: `${appleGrey}`,
      darkBlack : `${darkBlack}`
    },
    primary: {
      main: `${darkRed}`,
      light: "#ff6f4e",
      dark: "#c30000"
    },
    secondary: {
      main: `${gold}`,
      light: "#b78735",
      dark: "#533100",
    },
    warning:{
      main:"#ffc071",
      dark: "#c99043",
    },
    error:{
      xLight: red[50],
      main: red[500],
      dark: red[700]
    },
    success: {
      xLight: green[50],
      main: green[500],
      dark: green[700],
    },
    darkBlue:{
      main: `${darkBlue}`
    },
    appleGrey: `${appleGrey}`,
  },
  typography: {

    fontFamily: "'Muli', 'sans-serif'",
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 700,
    fontFamilySecondary: "'Philosopher', 'sans-serif'",
    genericFont:{
      fontFamily: 'Muli',
      color: "white",
    },

    tab:{
      fontFamily: 'Muli',
      textTransform: "none",
      fontWeight: 700,
      fontStyle: "italic",
      color: "white",
      fontSize: ".8rem",
      marginLeft: "5px"
    },

    footerlink:{
      fontFamily: 'Muli',
      textTransform: "none",
      fontWeight: 700,
      fontStyle: "italic",
      color: "white",
      fontSize: "1rem",
      minwidth: 10,
      marginLeft: "25px"
    },
    h2:{
      fontFamily: 'Muli',
      fontSize: "2.5rem",
      color: `${red}`,
      fontWeight: 700,
    },
    h4:{
      fontFamily: 'Muli',
      fontSize: "1.75rem",
      color: `${red}`,
      fontWeight: 700,
    },
    h5:{
      fontFamily: 'Muli',
      fontWeight: 700,
      color: `${red}`,
      lineHeight: 1.5
    },
    h6:{
      fontFamily: 'Muli',
      fontWeight: 700,
      color: `${red}`,
      lineHeight: 1.5
    },
    subtitle1:{
      fontSize: "1.25rem",
      fontWeight: 300,
      color: `${lightBlue}`,
    }

  },
});
