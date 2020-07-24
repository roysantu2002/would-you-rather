import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import { Typography } from '@material-ui/core'
import Container from "@material-ui/core/Container";
import { withStyles } from "@material-ui/core/styles";
import Answered from './Answered'

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
  };

  switchAuthModeHandler = () => {
    this.setState((prevState) => {
      return { isAnswered: !prevState.isAnswered };
    });
  };
  render() {

    const { classes } = this.props;
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

        <div> {answered} 

        {this.state.isAnswered ? <Answered/> : <div>NO</div>}

        </div>
    );
  }
}

export default withStyles(styles)(Dashboard);