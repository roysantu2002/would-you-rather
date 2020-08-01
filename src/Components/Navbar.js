import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Avatar from "@material-ui/core/Avatar";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { setAuthedUser } from "../actions/authedUser";

function ElevationScroll(props) {
  const { children } = props;

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
} //end of header elevator

function TabPanel() {
  const { children, value, index, ...other } = this.props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const useStyles = (theme) => ({

  tabContainer: {
    marginLeft: "auto",
  },

  appbar: {
    position: "relative",
    zIndex: theme.zIndex.drawer + 1,
    padding: 0,
  },
  home: {
    padding: 10,
    color: "white",
    "&:hover": {
      backgroundColor: "transparent",
    },
  },

  button: {
    marginRight: "50px",
    marginLeft: "50px",
  },
});

class Dashboard extends Component {
  state = {
    users: [],
    id: "",
    idError: "",
    value: 0,
    avatarURL: "",
  };

  componentDidMount() {
    let avatarURL = "";
    try {
      avatarURL = this.props.users[this.props.authedUser].avatarURL;
    } catch {
      avatarURL = "hello";
    }
    if (avatarURL === null) {
      avatarURL = "hello";
    }
    this.setState({ avatarURL: avatarURL });
  }
  handleLogout = () => {
    const { setAuthedUser } = this.props;
    setAuthedUser(null);
  };

  render() {
    const { classes } = this.props;
    const handleChange = (event, newValue) => {
      this.setState({ value: newValue });
    };

    return (
      <React.Fragment>
        <ElevationScroll>
          <AppBar className={classes.appbar}>
            <Button
              disableRipple
              className={classes.home}
              component={Link}
              to="/"
            >
              <Typography variant="h5" color="inherit">
                <Box textAlign="left" m={1}>
                  Welcome
                </Box>
              </Typography>
            </Button>
            <Toolbar disableGutters>
              <Tabs
                value={this.state.value}
                className={classes.tabContainer}
                onChange={handleChange}
              >
                <Tab label="Home" component={Link} to="/" />
                <Tab label="Leader Board" component={Link} to="/leaderboard" />
                <Tab label="Add Pool" component={Link} to="/addpoll" />
              </Tabs>

              <Button
                color="secondary"
                variant="contained"
                className={classes.button}
                onClick={this.handleLogout}
              >
                Logout
              </Button>
              <div className="pic">
                <Avatar
                  alt={this.props.authedUser}
                  src={this.state.avatarURL}
                />
                {this.props.authedUser}
              </div>
            </Toolbar>
          </AppBar>
        </ElevationScroll>
      </React.Fragment>
    );
  }
}

function mapStateToProps({ authedUser, users }) {
  return {
    authedUser,
    users,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    setAuthedUser: (id) => {
      dispatch(setAuthedUser(id));
    },
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles, { withTheme: true })(Dashboard));
