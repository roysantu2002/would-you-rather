import React, { Component } from "react"
import { Redirect } from "react-router-dom"
import { withStyles } from "@material-ui/core/styles"
import Button from "@material-ui/core/Button"
import Avatar from "@material-ui/core/Avatar"
import CssBaseline from "@material-ui/core/CssBaseline"
import Paper from "@material-ui/core/Paper"
import Radio from "@material-ui/core/Radio"
import RadioGroup from "@material-ui/core/RadioGroup"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import CheckIcon from "@material-ui/icons/Check"
import Container from "@material-ui/core/Container"
import Divider from "@material-ui/core/Divider"
import Typography from "@material-ui/core/Typography"
import Grid from "@material-ui/core/Grid"
import NoMatch from "./NoMatch"
import { formatDate } from "../utils/helpers"
import { connect } from "react-redux"
import { handleSavePollAnswer } from "../actions/shared"

const styles = (theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  divider: {
    margin: `${theme.spacing.unit * 3}px 0`,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
})

class PollDetails extends Component {
  state = {
    ans: "",
  }

  handleChange = (e) => {
    this.setState({
      ans: e.target.value,
    })
  }

  submitAnswer = (e) => {
    e.preventDefault()

    const { savePollAnswer } = this.props
    const answer = this.state.ans

    savePollAnswer(answer)

    return <Redirect to="/" />
  }

  render() {
    const { classes } = this.props
    const {
      poll,
      authorAvatar,
      timestamp,
      author,
      optionOne,
      optionTwo,
      answered,
      isOneAnswered,
      isTwoAnswered,
    } = this.props
    const optionOneVotes = poll ? poll.optionOne.votes.length : 0
    const optionTwoVotes = poll ? poll.optionTwo.votes.length : 0
    const optionOnePercentage = (
      (optionOneVotes / (optionOneVotes + optionTwoVotes)) *
      100
    ).toFixed(2)
    const optionTwoPercentage = (
      (optionTwoVotes / (optionOneVotes + optionTwoVotes)) *
      100
    ).toFixed(2)

    const form = (
      <form onSubmit={this.submitAnswer} noValidate>
        <Grid container spacing={2}>
          <RadioGroup
            aria-label="gender"
            name="gender1"
            value={this.state.ans}
            onChange={this.handleChange}
          >
            <FormControlLabel
              value="optionOne"
              control={<Radio />}
              label={optionOne}
            />
            <FormControlLabel
              value="optionTwo"
              control={<Radio />}
              label={optionTwo}
            />
          </RadioGroup>
        </Grid>

        <Grid item xs={12}>
          <Button
            id="sign-up-button"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={this.submitAnswer}
          >
            Submit
          </Button>
          <Divider />
        </Grid>
      </form>
    )
    const unAnsweredCard = (
      <Paper elevation={3} className={classes.paper}>
        <Divider className={classes.divider} light />
        {form}
        <Divider className={classes.divider} light />
        <Avatar alt={`Avatar of ${author}`} src={authorAvatar} />
        <Typography variant="subtitle1"> {timestamp}</Typography>
      </Paper>
    )
    const answeredCard = (
      <Paper elevation={3} className={classes.paper}>
        <Grid item xs={12}>
          <Typography variant="subtitle1">
            <span className={isOneAnswered ? "answered" : ""}>{optionOne}</span>
            <br />
            {isOneAnswered ? <CheckIcon /> : null}
            <span className="vote-result">{`${optionOneVotes} vote(s) | ${optionOnePercentage}%`}</span>
          </Typography>
        </Grid>
        <Divider className={classes.divider} light />

        <Grid item xs={12}>
          <Typography variant="subtitle1">
            <span className={isTwoAnswered ? "answered" : ""}>{optionTwo}</span>
            <br />
            {isTwoAnswered ? <CheckIcon /> : null}
            <span className="vote-result">{`${optionTwoVotes} vote(s) | ${optionTwoPercentage}%`}</span>
          </Typography>
        </Grid>
        <Divider className={classes.divider} light />
        <Avatar alt={`Avatar of ${author}`} src={authorAvatar} />
        <Typography variant="subtitle1"> {timestamp}</Typography>
      </Paper>
    )

    let showDisplay
    if (poll==null) showDisplay = <NoMatch />
    else if (answered) showDisplay = answeredCard
    else showDisplay = unAnsweredCard

    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Typography variant="h5" marked="center" align="center">
          Would You Rather
        </Typography>
        <Divider className={classes.divider} light />
        {showDisplay}  
      </Container>
    )
  }
}

function mapStateToProps({ authedUser, polls, users }, props) {
  const { question_id } = props.match.params
  const inValid = null
  const poll = question_id ? polls[question_id] : inValid
  const authorAvatar = poll ? users[poll.author].avatarURL : inValid
  const author = poll ? users[poll.author].id : inValid
  const timestamp = poll ? formatDate(poll.timestamp) : inValid
  const optionOne = poll ? poll.optionOne.text : inValid
  const optionTwo = poll ? poll.optionTwo.text : inValid
  const isOneAnswered = poll ?  poll.optionOne.votes.includes(authedUser) :inValid
  const isTwoAnswered = poll ? poll.optionTwo.votes.includes(authedUser) : inValid
  const answered = isOneAnswered || isTwoAnswered

  return {
    authorAvatar,
    author,
    timestamp,
    optionOne,
    optionTwo,
    answered,
    isOneAnswered,
    isTwoAnswered,
    poll,
    users,
    polls,
    authedUser,
    question_id,
  }
}

function mapDispatchToProps(dispatch, props) {
  const { question_id } = props.match.params
  return {
    savePollAnswer: (answer) => {
      dispatch(handleSavePollAnswer(question_id, answer))
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, { withTheme: true })(PollDetails))
