import React, { Component, useState } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Avatar from "@material-ui/core/Avatar";
import PhoneIcon from "@material-ui/icons/Phone";
import FavoriteIcon from "@material-ui/icons/Favorite";
import PersonPinIcon from "@material-ui/icons/PersonPin";
import HelpIcon from "@material-ui/icons/Help";
import ShoppingBasket from "@material-ui/icons/ShoppingBasket";
import ThumbDown from "@material-ui/icons/ThumbDown";
import ThumbUp from "@material-ui/icons/ThumbUp";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import MenuIcon from "@material-ui/icons/Menu";
import IconButton from "@material-ui/core/IconButton";
import { TextareaAutosize, Grid } from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { setAuthedUser } from "../actions/authedUser";
import { withRouter } from "react-router-dom";

//Header elevator

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
      role='tabpanel'
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

function a11yProps(index) {
  return {
    id: `scrollable-force-tab-${index}`,
    "aria-controls": `scrollable-force-tabpanel-${index}`,
  };
}

const useStyles = (theme) => ({
  toobarMargin: {
    ...theme.mixins.toolbar,
    marginBottom: "3em",
    [theme.breakpoints.down("md")]: {
      marginBottom: "1em",
    },
    [theme.breakpoints.down("xs")]: {
      marginBottom: "1.25em",
    },
  },

  tabContainer: {
    marginLeft: "auto",
  },
  tab: {
    ...theme.typography.tab,
    minWidth: 10,
    marginLeft: "50px",
  },
 home: {
   align: 'left',
   padding: 10,
   marginRight: "200px",
   color: "white",
   "&:hover":{
     backgroundColor: "transparent"
   }
 },
  // appbar: {
  //   zIndex: theme.zIndex.modal + 1,
  // },

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
  //handle Logout
  handleLogout = () => {
    const { setAuthedUser, history } = this.props;
    setAuthedUser(null);
    // this.props.history.push("/");
  };

  render() {
    const { classes } = this.props;
    const handleChange = (event, newValue) => {
      this.setState({ value: newValue });

      console.log(newValue);
    };

    return (
      <React.Fragment>
        <ElevationScroll>
          <AppBar position='float' className={classes.appbar}>

            <Button disableRipple className={classes.home} component={Link} to="/">
            <Typography variant='h5' color="white">Welcome</Typography>
            </Button>
            <Toolbar disableGutters>
              <Tabs
                value={this.state.value}
                className={classes.tabContainer}
                onChange={handleChange}
              >
                <Tab label='Home' component={Link} to='/' />
                <Tab label='Leader Board' component={Link} to='/leaderboard' />
                <Tab label='Add Pool' component={Link} to='/addpoll' />
              </Tabs>

              <Button
                component={Link}
                color='secondary'
                variant='contained'
                className={classes.button}
                onClick={this.handleLogout}
              >
                Logout
              </Button>
         
              <Grid spacing={2} > 
                <Grid item align='center' marginRight="10px">
                  <Avatar
                    alt={this.props.authedUser}
                    src={this.state.avatarURL}
                  />
                </Grid>
                <Grid item marginRight="10px">
                  <Typography>
                    {`${this.props.authedUser}`}{" "}
                  </Typography>
                </Grid>
                <Grid item></Grid>
              </Grid>
           
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
