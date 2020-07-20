import React, { Component, Fragment } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./UI/App.css";
// import Signup from "./Signup";
import theme from "./UI/AppTheme";
import { ThemeProvider } from "@material-ui/styles"
import CssBaseline from "@material-ui/core/CssBaseline";
import Dashboard from "./Dashboard";
import { connect } from "react-redux";
import { handleInitialData } from '../actions/shared'

class App extends Component {
  state = {
    loggedIn: ""

  };

  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
       <CssBaseline />

        <BrowserRouter>
        <Dashboard/>
          {/* <Switch>
            {!this.state.loggedIn ? (
              <Route path='/' exact component={Signup} />
            ) : (
              <Route path='/' component={Dashboard} />
            )}
          </Switch> */}
          {/* <Signup/> */}
          {/* <Dashboard
          value={0}
          setValue={0}
          selectedIndex={0}
          setSelectedIndex={0}
        /> */}
        </BrowserRouter>
      </ThemeProvider>
    );
  }
}

export default connect()(App);
