import React, { Component } from "react"
import Paper from "@material-ui/core/Paper"
import Button from "@material-ui/core/Button"
import CssBaseline from "@material-ui/core/CssBaseline"
import TextField from "@material-ui/core/TextField"
import Grid from "@material-ui/core/Grid"
import { withStyles } from "@material-ui/core/styles"
import Container from "@material-ui/core/Container"
import { connect } from "react-redux"
import Typography from "./UI/Typography"
import { setAuthedUser } from "../actions/authedUser"

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
    width: "70%",
    marginTop: theme.spacing(3),
    alignItems: "center",
  },
  submit: {
    
    margin: theme.spacing(3, 0, 2),

  },
  large: {
    width: theme.spacing(15),
    height: theme.spacing(15),
  },
})

class Login extends Component {
  state = {
    users: [],
    id: "",
    idError: "",
  }

  componentDidMount() {}

  checkValidity = () => {
    let idError = ""

    if (!this.state.id) {
      idError = "id cannot be empty"
    } else if (this.state.id) {
      if (this.state.id.length < 6) {
        idError = "id min of 6 characters"
      }
    }
    if (idError) {
      this.setState({ idError })
      return false
    } else {
      this.setState({ idError: "" })
    }

    return true
  }

  submitHandler = (event) => {
    event.preventDefault()
    const isValid = this.checkValidity()

    if (isValid) {
      const usersId = Object.keys(this.props.users)
      console.log(usersId)
      const isFound = usersId.includes(this.state.id)
      if (isFound) {
        this.props.setAuthedUser(this.state.id)
      } else {
        this.setState({ idError: "id not found!!" })
      }
    }
  }

  handleChange = (event) => {
    this.checkValidity()
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  switchAuthModeHandler = () => {
    this.setState((prevState) => {
      return { isSignup: !prevState.isSignup }
    })
  }

  render() {
    
    const { classes } = this.props
    const formElementsArray = []
    for (let key in this.state.controls) {
      formElementsArray.push({
        id: key,
        config: this.state.controls[key],
      })
    }

    const form = (
      <Paper elevation={3} className={classes.paper}>
        <Typography variant='h4' marked='center' align='center'>
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
            onClick={this.submitHandler}
          >
            Submit
          </Button>
        </form>
      </Paper>
    )

    return (
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        {form}
      </Container>
    )
  }
}

function mapStateToProps({ users }) {
  return {
    users,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setAuthedUser: (id) => {
      dispatch(setAuthedUser(id))
    },
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles, { withTheme: true })(Login))
