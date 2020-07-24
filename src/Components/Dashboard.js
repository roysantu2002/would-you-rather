import React, { Component } from "react";
import { connect } from 'react-redux'
import Button from "@material-ui/core/Button";
import { Typography } from '@material-ui/core'
import Container from "@material-ui/core/Container";
import { withStyles } from "@material-ui/core/styles";
import Answered from './Answered'
import { handleInitialPolls } from '../actions/shared'
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import ListSubheader from "@material-ui/core/ListSubheader";
import Grid from "@material-ui/core/Grid";

const styles = (theme) => ({
 
    root: {
      marginTop: theme.spacing(8),
      marginBottom: theme.spacing(4),
      backgroundImage: "url('/assets/bg-patt.svg')",
  
    },
    container: {
      marginTop: theme.spacing(10),
      marginBottom: theme.spacing(15),
      position: "relative",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    item: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: theme.spacing(0, 5),
    },
    title: {
      marginBottom: theme.spacing(14),
    },
    number: {
      fontSize: 24,
      fontFamily: theme.typography.fontFamily,
      color: theme.palette.primary.main,
      fontWeight: theme.typography.fontWeightMedium,
    },
    image: {
      height: 55,
      marginTop: theme.spacing(4),
      marginBottom: theme.spacing(4),
    },
    curvyLines: {
      pointerEvents: "none",
      position: "absolute",
      top: -180,
      opacity: 0.7,
    },
    button: {
      marginTop: theme.spacing(8),
      minWidth: 200,
    },
    gridControl: {
      padding: 20,
      marginTop: 15,
    },
    ico: {
      size: "3em",
      color: "#835A00",
      marginTop: 10,
      marginBottom: 10
    }
  });

class Dashboard extends Component {
  state = {
    users: [],
    isAnswered: true,
  }

  componentDidMount () {
    this.props.dispatch(handleInitialPolls())
}
  

  switchAuthModeHandler = () => {
    this.setState((prevState) => {
      return { isAnswered: !prevState.isAnswered };
    });
  };

  render() {

    const { classes, answeredPolls, unansweredPolls,loadingBar } = this.props

    const answered = 
    <section className={classes.root}>
    <Container  component="section">
        {/* <Typography variant="h1"> Leader Board</Typography>
           <Typography variant="h1"> Leader Board</Typography>
           <Typography variant="h1"> Leader Board</Typography>
           <Typography variant="h1"> Leader Board</Typography>
   <Button onClick={this.switchAuthModeHandler}>
     SWITCH TO {this.state.isSignup ? "SIGNIN" : "SIGNUP"}
   </Button>
   <Button onClick={this.switchAuthModeHandler}>
     SWITCH TO {this.state.isSignup ? "SIGNIN" : "SIGNUP"}
   </Button> */}
   <Typography variant='h5' marked='center' align='center' onClick={this.switchAuthModeHandler}>
   {/* <Button onClick={this.switchAuthModeHandler}> */}
     Switch To :  {this.state.isAnswered ? "Answered" : "Unanswered"}


   </Typography>
 </Container>
 </section>

    return (
      <section className={classes.root}>

      <Container  component="section">

      <Typography variant='h5' marked='center' align='center' onClick={this.switchAuthModeHandler}>

         Switch To :  {this.state.isAnswered ? "Answered" : "Unanswered"}
   </Typography>

      <Grid container className={classes.root} spacing={2}>
 
    {this.state.isAnswered ? unansweredPolls.map((id) => ( <Grid item xs={6}><Answered id={id}/> </Grid>)) : <p> No</p> }

        {/* {!loadingBar.default && Object.keys(answeredPolls).length === 0 && this.state.isAnswered ?  <p className='no-results'>no results</p>  : null}

        {!loadingBar.default && Object.keys(unansweredPolls).length === 0 && this.state.unAnswered ?  <p className='no-results'>no results</p>  : null} */}

       </Grid>
    </Container>
    </section>
      
    );
  }
}

function mapStateToProps ({ polls, authedUser, users, loadingBar }) {
  const user = users[authedUser]

  const answeredPolls = Object.keys(polls).length !== 0
      ? Object.keys(user.answers)
          .sort((a,b) => polls[b].timestamp - polls[a].timestamp)
      : []

  const unansweredPolls = Object.keys(polls).length !== 0
      ? Object.keys(polls)
          .filter(pollID => !answeredPolls.includes(pollID))
          .sort((a,b) => polls[b].timestamp - polls[a].timestamp)
      : []

  return {
      answeredPolls,
      unansweredPolls,
      loadingBar,
  }
}



export default connect(
  mapStateToProps,

)(withStyles(styles, { withTheme: true })(Dashboard));