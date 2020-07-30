import React, { Component } from "react"
import Paper from "@material-ui/core/Paper"
import Button from "@material-ui/core/Button"
import CssBaseline from "@material-ui/core/CssBaseline"
import FormControl from "@material-ui/core/FormControl"
import InputLabel from "@material-ui/core/InputLabel"
import Select from "@material-ui/core/Select"
import MenuItem from "@material-ui/core/MenuItem"
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
  formControl: {
    margin: theme.spacing(1),
    minWidth: 250,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
})

class Login extends Component {
  state = {
    userId: "",
    idError: "",
  }

  checkValidity = () => {
    let idError = ""

    if (!this.state.userId) {
      idError = "id cannot be empty"
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
    if (this.state.userId) {
      this.props.setAuthedUser(this.state.userId)
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

  onSelectUserId = (userId) => this.setState({ userId })

  render() {
    const { classes, users } = this.props
    const usersId = Object.keys(users)

    const formElementsArray = []
    for (let key in this.state.controls) {
      formElementsArray.push({
        id: key,
        config: this.state.controls[key],
      })
    }

    const form = (
      <Paper elevation={3} className={classes.paper}>
        <Typography variant="h4" marked="center" align="center">
          Would You Rather
        </Typography>
        <form className={classes.form} onSubmit={this.submitHandler} noValidate>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel  id="user-id">user</InputLabel>
            
              <Select
                className={classes.selectEmpty}
                displayEmpty
                value={this.state.userId}
                onChange={(e) => this.onSelectUserId(e.target.value)}
              >
                {usersId.map((id) => (
                  <MenuItem value={id} key={id}>
                    {id}
                  </MenuItem>
                ))}
              </Select>
           
            </FormControl>
            <div style={{ fontSize: 12, color: "red" }}>
              {this.state.idError}
            </div>
         
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
        </form>
      </Paper>
    )

    return (
      <Container component="main" maxWidth="xs">
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
