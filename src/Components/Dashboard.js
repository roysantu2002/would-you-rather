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
import { setAuthedUser } from '../actions/authedUser'

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
//tabs functoions
//Styles

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
  },
  menu: {
    backgroundColor: theme.palette.common.grey,
    color: theme.palette.common.blue,
    borderRadius: "0px",
  },
  menuItem: {
    ...theme.typography.tab,
    opacity: 0.7,
    "&:hover": {
      opacity: 1,
    },
  },
  drawerIconContainer: {
    marginLeft: "auto",
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  drawerIcon: {
    height: "30px",
    width: "30px",
  },
  drawer: {
    backgroundColor: theme.palette.common.blue,
  },
  drawerItem: {
    ...theme.typography.tab,
    color: theme.palette.common.grey,
    opacity: 0.7,
  },
  drawerItemSelected: {
    "& .MuiListItemText-root": {
      opacity: 1,
    },
  },
  appbar: {
    zIndex: theme.zIndex.modal + 1,
  },

  button: {
    marginRight: 20,
  },
});

class Dashboard extends Component {

  //handle Logout
  handleLogout = () => {
    const { setAuthedUser, history } = this.props;
    setAuthedUser(null);
    history.push("/");
  };

  render() {
    // console.log(this.props.authState.loggedIn);
    // const theme = useTheme();
    const { classes } = this.props;
    // const matches = useMediaQuery(theme.breakpoints.down("md"));
    // const theme = useTheme();
    const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);

    // const [openDrawer, setOpenDrawer] = useState(false);
    // const [anchorEl, setAnchorEl] = useState(null);
    // const [openMenu, setOpenMenu] = useState(false);

    const handleChange = (event, newValue) => {
      this.props.setValue(newValue);
    };

    // const handleClick = (event) => {
    //   setAnchorEl(event.currentTarget);
    //   setOpenMenu(true);
    // };

    // const handleClose = () => {
    //   setAnchorEl(null);
    //   setOpenMenu(false);
    // };

    // const handleMenuItemClick = (event, i) => {
    //   setAnchorEl(null);
    //   setOpenMenu(false);
    //   this.props.setSelectedIndex(i);
    // };

    const routes = [
      {
        name: "Home",
        link: "/",
        activeIndex: 0,
      },
      {
        name: "Leaderboard",
        link: "/Leaderboard",
        activeIndex: 1,
      },
      {
        name: "Add Poll",
        link: "/AddPoll",
        activeIndex: 2,
      },
    ];

    const tabs = (
      <React.Fragment>
        <Tabs
          className={classes.tabContainer}
          color='secondary'
          value={this.props.value}
          onChange={handleChange}
          variant='scrollable'
          scrollButtons='on'
          indicatorColor='secondary'
          textColor='secondary'
          aria-label='scrollable force tabs example'
        >
          {routes.map((route, index) => (
            <Tab
              className={classes.tab}
              key={`${route}${index}`}
              component={Link}
              to={route.link}
              label={route.name}
              aria-owns={route.ariaowns}
              aria-haspopup={route.ariahaspopup}
              icon={route.icon}
              onMouseOver={route.onMouseOver}
              {...a11yProps(route.index)}
            />
          ))}
        </Tabs>

        <Button
          component={Link}
          color='secondary'
          href='/Signup'
          variant='contained'
          className={classes.button}
          onClick={this.handleLogout}
        >
          Logout
        </Button>
        <Grid spacing={2}>
          <Grid item align='center'>
            <Avatar
              alt={this.props.authedUser}
              src={this.props.users[this.props.authedUser].avatarURL}
            />
          </Grid>
          <Grid item>
            <Typography marginBottom='10'>
              {`${this.props.authedUser}`}{" "}
            </Typography>
          </Grid>
        </Grid>
      </React.Fragment>
    );

    return (
      <React.Fragment>
        <ElevationScroll>
          <AppBar position='fixed' className={classes.appbar}>
            <Typography variant='h5'>Welcome</Typography>
            <Toolbar disableGutters={false}>
              <Button
                disableRipple
                className={classes.logoContainer}
                component={Link}
                to='/'
                onClick={() => this.props.setValue(0)}
              ></Button>
              {tabs}
            </Toolbar>
          </AppBar>
        </ElevationScroll>
        <div className={classes.toobarMargin} />
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
          dispatch(setAuthedUser(id))
      }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(useStyles, { withTheme: true })(Dashboard)
);
