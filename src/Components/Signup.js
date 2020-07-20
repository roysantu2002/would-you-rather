import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { connect } from "react-redux";
import registerAction from "../actions/registerAction";
import loginAction from "../actions/loginAction";
import data from "../data/users";
import Typography from "./UI/Typography";
import Dashboard from "./Dashboard"
import store from '../store'
import * as DataApi from '../utils/_DATA'


const useStyles = (theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  large: {
    width: theme.spacing(15),
    height: theme.spacing(15),
  },
});

class SignUp extends Component {
  state = {
    users: [],
    id: "",
    isSignup: true,
  };

  componentDidMount() {
    // DataApi._getUsers()
    // .then((res) => {
    //   this.setState(() => ({
    //     users: res,
    //   }));
    //   // console.log(res)
    // })
    // const usersData = [];
    // // var keyArray = Object.keys(obj); // key1
    // // console.log(obj[keyArray[0]]); // value

    // console.log(keyArray);
    // data.map((postData) => {
    //   usersData.push(postData);
    // });
    // this.setState(() => ({
    //   users: usersData,
    // }));
  }

  checkValidity = () => {
    let isValid = true;
    let idError = "";

    if (!this.state.id) {
      idError = "id cannot be empty";
    } else if (this.state.id) {
      if (this.state.id.length < 6) {
        idError = "id min of 6 characters";
      }
    }
    if (idError) {
      this.setState({ idError });
      return false;
    } else {
      this.setState({ idError: "" });
    }

    return true;
  };

  submitHandler = (event) => {
    event.preventDefault();
    const isValid = this.checkValidity();

    if (isValid) {
      this.props.loginAction(this.state.id);
    }
    if (isValid && this.state.isSignup) {
      console.log("addding data")
      this.props.registerAction(this.state.id);
    }

   
  };

  /* Enable typing in text boxes */
  handleChange = (event) => {
    this.checkValidity();
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  switchAuthModeHandler = () => {
    this.setState((prevState) => {
      return { isSignup: !prevState.isSignup };
    });
  };

  /* Render sign up form */
  render() {
    const { classes } = this.props;
    let errorMessage = null;
    const formElementsArray = [];
    const { loggedIn } = this.props;
    for (let key in this.state.controls) {
      formElementsArray.push({
        id: key,
        config: this.state.controls[key],
      });
    }

    const form = (
      <div className={classes.paper}>
        <Typography variant='h2' marked='center' align='center'>
          Would You Rather
        </Typography>
        <form className={classes.form} onSubmit={this.submitHandler} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}></Grid>
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant='outlined'
              required
              fullWidth
              id='id'
              label='user id'
              value={this.state.email}
              name='id'
              autoComplete='id'
              onChange={this.handleChange}
            />
            <div style={{ fontSize: 12, color: "red" }}>
              {this.state.idError}
            </div>
          </Grid>
          <Button
            id='sign-up-button'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
            //   onClick={() =>
            //     this.props.loginAction(this.state.email, this.state.password)
            //   }

            onClick={this.submitHandler}
          >
            Submit
          </Button>
        </form>
        {/* <Button onClick={this.switchAuthModeHandler}>
          SWITCH TO {this.state.isSignup ? "SIGNIN" : "SIGNUP"}
        </Button> */}
      </div>
    );

    const logIn = <div> Test </div>

    if (this.props.error) {
      errorMessage = <p>{this.props.error.message}</p>;
    }


    console.log(this.props.authState.loggedIn)
    if (this.props.authState.loggedIn) {
        return ( <Dashboard/>)
      }

    return (
     
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
       {form}
      {/* // {console.log(`This is from store:store ${store.getState().authState.loggedIn}`)} */}
      </Container>
    );
  }
}


const mapStateToProps = state => ({
    ...state
  });

const mapDispatchToProps = (dispatch) => ({
  registerAction: (id) => dispatch(registerAction(id)),
  loginAction: (id) => dispatch(loginAction(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles, { withTheme: true })(SignUp));
