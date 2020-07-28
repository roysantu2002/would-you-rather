import React, { Component } from "react"
import { connect } from "react-redux"
import { Typography } from "@material-ui/core"
import Container from "@material-ui/core/Container"
import { withStyles } from "@material-ui/core/styles"
import Answered from "./Answered"
import { handleInitialPolls } from "../actions/shared"
import Grid from "@material-ui/core/Grid"

const styles = (theme) => ({
  root: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(4),
    backgroundImage: "url('/assets/bg-patt.svg')",
  }
})

class Dashboard extends Component {
  state = {
    users: [],
    isAnswered: true,
  }

  componentDidMount() {
    this.props.dispatch(handleInitialPolls())
  }

  switchAuthModeHandler = () => {
    this.setState((prevState) => {
      return { isAnswered: !prevState.isAnswered }
    })
  }

  render() {
    const { classes, answeredPolls, unansweredPolls, loadingBar } = this.props

    // const answered = (
    //   <section className={classes.root}>
    //     <Container component="section">
    //       <Typography
    //         variant="h5"
    //         marked="center"
    //         align="center"
    //         onClick={this.switchAuthModeHandler}
    //       >
    //         {/* <Button onClick={this.switchAuthModeHandler}> */}
    //         Switch To : {this.state.isAnswered ? "Answered" : "Unanswered"}
    //       </Typography>
    //     </Container>
    //   </section>
    // )

    return (
      <section className={classes.root}>
        <Container component="section">
          <Typography
            variant="h5"
            marked="center"
            align="center"
            onClick={this.switchAuthModeHandler}
          >
            Switch To : {this.state.isAnswered ? "Unanswered" : "Answered"}
          </Typography>

          <Grid container className={classes.root} spacing={2}>
            {this.state.isAnswered
              ? answeredPolls.map((id) => (
                  <Grid item xs={6}>
                    <Answered id={id} />{" "}
                  </Grid>
                ))
              : unansweredPolls.map((id) => (
                  <Grid item xs={6}>
                    <Answered id={id} />{" "}
                  </Grid>
                ))}

            {!loadingBar.default &&
            Object.keys(answeredPolls).length === 0 &&
            this.state.isAnswered ? (
              <p className="no-results">no results</p>
            ) : null}

            {!loadingBar.default &&
            Object.keys(unansweredPolls).length === 0 &&
            this.state.unAnswered ? (
              <p className="no-results">no results</p>
            ) : null}
          </Grid>
        </Container>
      </section>
    )
  }
}

function mapStateToProps({ polls, authedUser, users, loadingBar }) {
  const user = users[authedUser]

  const answeredPolls =
    Object.keys(polls).length !== 0
      ? Object.keys(user.answers).sort(
          (a, b) => polls[b].timestamp - polls[a].timestamp
        )
      : []

  const unansweredPolls =
    Object.keys(polls).length !== 0
      ? Object.keys(polls)
          .filter((pollID) => !answeredPolls.includes(pollID))
          .sort((a, b) => polls[b].timestamp - polls[a].timestamp)
      : []

  return {
    answeredPolls,
    unansweredPolls,
    loadingBar,
  }
}

export default connect(mapStateToProps)(
  withStyles(styles, { withTheme: true })(Dashboard)
)
