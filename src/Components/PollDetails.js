import React, { Component, useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Card from "@material-ui/core/Card";
import Paper from "@material-ui/core/Paper";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Radio from '@material-ui/core/Radio';
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import CheckIcon from "@material-ui/icons/Check";
import Container from "@material-ui/core/Container";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import ListSubheader from "@material-ui/core/ListSubheader";
import Grid from "@material-ui/core/Grid";

import { formatDate } from "../utils/helpers";

import { connect } from "react-redux";
import { handleSavePollAnswer } from "../actions/shared";

const styles = (theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  gridList: {
    width: 500,
    height: 450,
  },
  card: {
    padding: 8,
    margnTop: 4,
    maxWidth: 600,
    margin: "auto",
    transition: "0.3s",
    boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
    "&:hover": {
      boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)",
    },
  },
  caption: {
    maxWidth: "60%",
  },
  media: {
    width: "100%",
    margnTop: "5em",
    paddingTop: "100%",
  },
  content: {
    textAlign: "left",
    padding: theme.spacing.unit * 3,
  },
  divider: {
    margin: `${theme.spacing.unit * 3}px 0`,
  },
  heading: {
    fontWeight: "bold",
  },
  subheading: {
    lineHeight: 1.8,
  },
  avatar: {
    display: "inline-block",
    border: "2px solid white",
    "&:not(:first-of-type)": {
      marginLeft: theme.spacing.unit,
    },
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

class PollDetails extends Component {
  state = {
    ans: "",
  };

  handleChange = (e) => {
    this.setState({
      ans: e.target.value,
    });
  };

  submitAnswer = (e) => {
    e.preventDefault();

    const { savePollAnswer } = this.props;
    const answer = this.state.selectedOption;

    // i have succesfully got the answer text now check the _data file to see what is the expected arguments

    savePollAnswer(answer);
  };

  render() {
    const { classes } = this.props;
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
    } = this.props;
    const optionOneVotes = poll.optionOne.votes.length;
    const optionTwoVotes = poll.optionTwo.votes.length;
    const optionOnePercentage = (
      (optionOneVotes / (optionOneVotes + optionTwoVotes)) *
      100
    ).toFixed(2);
    const optionTwoPercentage = (
      (optionTwoVotes / (optionOneVotes + optionTwoVotes)) *
      100
    ).toFixed(2);

    const form = (
      <form onSubmit={this.submitHandler} noValidate>
        <Grid container spacing={2}>
          <RadioGroup
            aria-label="gender"
            name="gender1"
            value={this.state.ans}
            onChange={this.handleChange}
          >
            <FormControlLabel
              value={optionOne}
              control={<Radio />}
              label={optionOne}
            />
            <FormControlLabel
              value={optionTwo}
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
              onClick={this.submitHandler}
            >
              Submit
            </Button> 
            <Divider />
        </Grid>
      </form>
    );
    const unAnsweredCard = (
      <Paper elevation={3} className={classes.paper}>
        <Divider className={classes.divider} light />
        {form}
      </Paper>
    );
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
      
      </Paper>
    );

    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Typography variant="h5" marked="center" align="center">
          Would You Rather
        </Typography>
        <Divider className={classes.divider} light />
        {answered ? answeredCard : unAnsweredCard}
        <Divider className={classes.divider} light />
          <Avatar alt={`Avatar of ${author}`} src={authorAvatar} />
          <Typography variant="subtitle1"> {timestamp}</Typography>
      </Container>
    );
  }
}

function mapStateToProps({ authedUser, polls, users }, props) {
  const { question_id } = props.match.params;
  const poll = polls[question_id];
  const authorAvatar = users[poll.author].avatarURL;
  const author = users[poll.author].id;
  const timestamp = formatDate(poll.timestamp);
  const optionOne = poll.optionOne.text;
  const optionTwo = poll.optionTwo.text;
  const isOneAnswered = poll.optionOne.votes.includes(authedUser);
  const isTwoAnswered = poll.optionTwo.votes.includes(authedUser);
  const answered = isOneAnswered || isTwoAnswered;

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
  };
}

function mapDispatchToProps(dispatch, props) {
  const { question_id } = props.match.params;
  return {
    savePollAnswer: (answer) => {
      dispatch(handleSavePollAnswer(question_id, answer));
    },
  };
}

export default connect(mapStateToProps)(
  withStyles(styles, { withTheme: true })(PollDetails)
);
