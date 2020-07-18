import React, { useState } from "react";
import { BrowserRouter as Router, Route } from 'react-router-dom'
import "./UI/App.css";
import Signup from "./Signup"
import theme from "./UI/AppTheme";
import { ThemeProvider } from "@material-ui/styles";

function App() {
  return (
    <Router>
    <ThemeProvider theme={theme}>
    <Signup/>
    </ThemeProvider>
    </Router>
  );
}
export default App;
 