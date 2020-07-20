import React, { Component, Fragment } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./UI/App.css";
import Signup from "./Signup";
import theme from "./UI/AppTheme";
import { ThemeProvider } from "@material-ui/styles"
import CssBaseline from "@material-ui/core/CssBaseline";
import Dashboard from "./Dashboard";
import { connect } from "react-redux";
import { handleInitialData } from '../actions/shared'


class App extends Component {
  state = {
    loggedIn: "",
  };

  componentDidMount() {
 
    this.props.dispatch(handleInitialData())
    // this.setState({ loggedIn: this.props.authState.loggedIn });
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
          value={value}
          setValue={setValue}
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
        /> */}
        </BrowserRouter>
      </ThemeProvider>
    );
  }
}

// const mapStateToProps = (state) => ({ ...state });
export default connect()(App);
