import React, { Component, useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Container from "@material-ui/core/Container";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import ListSubheader from "@material-ui/core/ListSubheader";
import Grid from "@material-ui/core/Grid";
import { formatDate } from '../utils/helpers'

import { connect } from "react-redux";
import { handleSavePollAnswer } from '../actions/shared'

const styles = (theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 500,
    height: 450,
  },
  card: {
    padding: 8,
    margnTop: 4,
    maxWidth: 300,
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
});

class PollDetails extends Component {
  state = {
    selectedOption: "",
  };

  selectRadio = (e) => {
    this.setState({
      selectedOption: e.target.value,
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
    const { poll, authorAvatar, timestamp, author, optionOne, optionTwo, answered, isOneAnswered, isTwoAnswered } = this.props
    const optionOneVotes = poll.optionOne.votes.length
    const optionTwoVotes = poll.optionTwo.votes.length
    const optionOnePercentage = (optionOneVotes / (optionOneVotes + optionTwoVotes) * 100).toFixed(2)
    const optionTwoPercentage = (optionTwoVotes / (optionOneVotes + optionTwoVotes) * 100).toFixed(2)


    return (
        answered ? <div> Ans </div> :
      <Card className={classes.card}>
        <CardContent className={classes.content}>
          <Typography variant="h6" gutterBottom color="primary">
            Would You Rather
          </Typography>

          <Typography
            className={"MuiTypography--subheading"}
            variant="subtitle1"
          >
            {optionOne.text}
          </Typography>

          <Divider className={classes.divider} light />
          <Typography
            className={"MuiTypography--subheading"}
            variant="subtitle1"
          >
            {optionTwo.text}
          </Typography>
        </CardContent>
      </Card>
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
