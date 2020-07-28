import React, { Component } from "react"
import { addPollAction } from "../actions/shared"
import { connect } from "react-redux"
import { Redirect } from "react-router-dom"
import Paper from "@material-ui/core/Paper"
import CssBaseline from "@material-ui/core/CssBaseline"
import { withStyles } from "@material-ui/core/styles"
import Container from "@material-ui/core/Container"
import Grid from "@material-ui/core/Grid"
import TextField from "@material-ui/core/TextField"
import Typography from "./UI/Typography"
import Button from "@material-ui/core/Button"

const useStyles = (theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "80%",
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  }
})

class Addpoll extends Component {
  state = {
    users: [],
    optionOne: "",
    optionTwo: "",
    oneError: "",
    twoError: "",
    toHome: false,
  }

  checkValidity = () => {
    let isValid = true
    let oneError = ""
    let twoError = ""

    if (!this.state.optionOne) {
      oneError = "Option one cannot be empty"
      isValid = false
    } else if (this.state.optionOne) {
      if (this.state.optionOne.length < 6) {
        oneError = "Option one min of 6 characters"
      }
    }

    if (!this.state.optionTwo) {
      twoError = "Option two cannot be empty"
    } else if (this.state.optionTwo) {
      if (this.state.optionTwo.length < 6) {
        twoError = "Option two min of 6 characters"
      }
    }

    if (oneError) {
      this.setState({ oneError })
      isValid = false
    } else {
      this.setState({ oneError: "" })
      isValid = true
    }

    if (twoError) {
      this.setState({ twoError })
      isValid = false
    } else {
      this.setState({ twoError: "" })
      isValid = true
    }

    return isValid
  }

  /* Enable typing in text boxes */
  handleChange = (event) => {
    this.checkValidity()
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  submitHandler = (event) => {
    event.preventDefault()
    const isValid = this.checkValidity()
    const { optionOne, optionTwo } = this.state
    console.log(isValid)
    if (isValid) {
      this.props.addPoll(optionOne, optionTwo)
      this.setState(() => ({
        toHome: true,
      }))
    }
  }

  render() {
    const { classes } = this.props
    const { toHome } = this.state

    if (toHome === true) {
      return <Redirect to='/' />
    }

    return (
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <Paper elevation={3} className={classes.paper}>
          <Typography variant='h4' marked='center' align='center'>
            Would You Rather
          </Typography>
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
                id='optionOne'
                label='Option One'
                value={this.state.optionOne}
                name='optionOne'
                autoComplete='optionOne'
                onChange={this.handleChange}
              />
              <div style={{ fontSize: 12, color: "red" }}>
                {this.state.oneError}
              </div>
            </Grid> <br/>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                required
                fullWidth
                id='optionTwo'
                label='Option Two'
                value={this.state.optionTwo}
                name='optionTwo'
                autoComplete='optionTwo'
                onChange={this.handleChange}
              />
              <div style={{ fontSize: 12, color: "red" }}>
                {this.state.twoError}
              </div>
            </Grid>
            <Button
              id='submit'
              fullWidth
              variant='contained'
              color='primary'
              className={classes.submit}
              onClick={this.submitHandler}
            >
              Submit
            </Button>
          </form>
       </Paper>
      </Container>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addPoll: (optionOne, optionTwo) => {
      dispatch(addPollAction(optionOne, optionTwo))
    },
  }
}
export default connect(
  null,
  mapDispatchToProps
)(withStyles(useStyles, { withTheme: true })(Addpoll))
