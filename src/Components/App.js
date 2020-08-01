import React, { Component, Fragment } from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import theme from "./UI/AppTheme"
import { ThemeProvider } from "@material-ui/styles"
import CssBaseline from "@material-ui/core/CssBaseline"
import { connect } from "react-redux"
import { handleInitialData, handleInitialPolls } from "../actions/shared"
import LoadingBar from "react-redux-loading"
import Navbar from "./Navbar"
import Login from "./Login"
import './UI/Global.css'
import Dashboard from "./Dashboard"
import NoMatch from './NoMatch'
import AddPoll from "./Addpoll"
import LeadersCard from "./LeadersCard"
import PollDetails from './PollDetails'

class App extends Component {
  state = {
    loggedIn: "",
  }

  componentDidMount() {
    const AUTHED_ID = null
    this.props.dispatch(handleInitialData(AUTHED_ID))
    this.props.dispatch(handleInitialPolls())

  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Fragment>
            <LoadingBar />
            <Switch>
              {this.props.authedUser === null ? (
                <Route path='/' component={Login} />
              ) : (
                <Fragment>
                  <Navbar/>
                  <Route path='/' exact component={Dashboard} />
                  <Route path='/questions/:question_id' component={PollDetails} />
                  <Route path='/leaderboard' component={LeadersCard} />
                  <Route path='/addpoll' component={AddPoll} />
                </Fragment>
              )}
                <Route component={NoMatch} />
            </Switch>
          </Fragment>
        </Router>
      </ThemeProvider>
    )
  }
}

function mapStateToProps({ authedUser, users }) {
  return {
    authedUser,
    users,
  }
}
export default connect(mapStateToProps)(App)
