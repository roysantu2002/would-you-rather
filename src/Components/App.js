import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./UI/App.css";
// import Signup from "./Signup";
import theme from "./UI/AppTheme";
import { ThemeProvider } from "@material-ui/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { connect } from "react-redux";
import { handleInitialData } from "../actions/shared";
import LoadingBar from "react-redux-loading";
import Navbar from "./Navbar";
import Login from "./Login";
import Dashboard from "./Dashboard";
import Leaderboard from "./Leaderboard";
import AddPoll from "./Addpoll";

class App extends Component {
  state = {
    loggedIn: "",
  };

  componentDidMount() {
    const AUTHED_ID = null;
    this.props.dispatch(handleInitialData(AUTHED_ID));
    console.log(this.props.authedUser);
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Fragment>
            <LoadingBar />

            {/* <Route path='/' exact component={Login} />  */}
            <Switch>
              {this.props.authedUser === null ? (
                <Route path='/' exact component={Login} />
              ) : (
                <Fragment>
                  <Navbar/>
                  <Route path='/' exact component={Dashboard} />
                  <Route path='/leaderboard' component={Leaderboard} />
                  <Route path='/addpoll' component={AddPoll} />
                </Fragment>
              )}
            </Switch>
          </Fragment>
        </Router>
      </ThemeProvider>
    );
  }
}

function mapStateToProps({ authedUser, users }) {
  return {
    authedUser,
    users,
  };
}
export default connect(mapStateToProps)(App);
