import React, { Component } from "react";
import { Link } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { connect } from "react-redux";
import registerAction from "../actions/registerAction";

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

const initialState = {
  email: "",
  password: "",
  emailError: "",
  passwordError: "",
};

class SignUp extends Component {
  state = {
    data: [],
    initialState,
    isSignup: true,
  };

  checkValidity = () => {
    let isValid = true;
    let emailError = "";
    let passwordError = "";

    const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

    if (!this.state.email) {
      emailError = "Email cannot be empty";
    }

    if (this.state.email) {
      isValid = pattern.test(this.state.email);
      if (!isValid) {
        emailError = "Please enter valid email address";
      }
    }
    if (!this.state.password) {
      passwordError = "Password cannot be empty";
    } else if (this.state.password) {
      if (this.state.password.length < 6) {
        passwordError = "Password not strong";
      }
    }

    if (emailError || passwordError) {
      this.setState({ emailError, passwordError });
      return false;
    } else {
      this.setState({ emailError: "", passwordError: "" });
    }

    return true;
  };

  inputChangedHandler = (event, controlName) => {
    console.log(controlName);

    const updatedControls = {
      ...this.state.controls,
      [controlName]: {
        ...this.state.controls[controlName],
        value: event.target.value,
        valid: this.checkValidity(
          event.target.value,
          this.state.controls[controlName].validation
        ),
        touched: true,
      },
    };
    this.setState({ controls: updatedControls });
  };

  submitHandler = (event) => {
    event.preventDefault();
    const isValid = this.checkValidity();
    console.log(isValid);
    // console.log(`Submit Email ${this.state.controls.email.valid}`);
    // console.log(`Submit Password ${this.state.controls.password.valid}`);

    // this.props.onAuth(
    //   this.state.controls.email.value,
    //   this.state.controls.password.value,
    //   this.state.isSignup
    // );
  };

  /* Enable typing in text boxes */
  handleChange = (event) => {
    this.checkValidity()
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
    const formElementsArray = [];

    for (let key in this.state.controls) {
      formElementsArray.push({
        id: key,
        config: this.state.controls[key],
      });
    }

    let form = formElementsArray.map((formElement) => (
      <Grid item xs={12}>
        <TextField
          id={formElement.id}
          label={formElement.id}
          name={formElement.id}
          variant='outlined'
          //value={formElement.config.value}
          validators={formElement.config.validation}
          errorMessages={formElement.config.errorMessages}
          //   elementType={formElement.config.elementType}
          //   elementConfig={formElement.config.elementConfig}
          //   value={formElement.config.value}
          //   invalid={!formElement.config.valid}
          //   shouldValidate={formElement.config.validation}
          //   touched={formElement.config.touched}
          onChange={(event) => this.inputChangedHandler(event, formElement.id)}
        />
      </Grid>
    ));
    const { classes } = this.props;

    let errorMessage = null;

    if (this.props.error) {
      errorMessage = <p>{this.props.error.message}</p>;
    }
    return (
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <div className={classes.paper}>
          <form
            className={classes.form}
            onSubmit={this.submitHandler}
            noValidate
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}></Grid>
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                required
                fullWidth
                id='email'
                label='Email'
                value={this.state.email}
                name='email'
                autoComplete='email'
                onChange={this.handleChange}
              />
              <div style={{ fontSize: 12, color: "red" }}>
                {this.state.emailError}
              </div>
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                required
                fullWidth
                name='password'
                label='Password'
                value={this.state.password}
                type='password'
                id='password'
                autoComplete='current-password'
                onChange={this.handleChange}
              />
              <div style={{ fontSize: 12, color: "red" }}>
                {this.state.passwordError}
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
              Sign Up
            </Button>
          </form>
        </div>
      </Container>
    );
  }
}

// const mapStateToProps = state => {
//     return {
//         ...state,
//         // loading: state.auth.loading,
//         // error: state.auth.error,
//         // isAuthenticated: state.auth.token !== null,
//         // buildingBurger: state.burgerBuilder.building,
//         // authRedirectPath: state.auth.authRedirectPath
//     };
// };

const mapStateToProps = (state) => ({
  ...state,
});

const mapDispatchToProps = (dispatch) => ({
  registerAction: (email, password) =>
    dispatch(registerAction(email, password)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles, { withTheme: true })(SignUp));
