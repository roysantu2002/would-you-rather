import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Container from "@material-ui/core/Container";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
// import data from "../../src/data/influencer";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import ListSubheader from "@material-ui/core/ListSubheader";
import Grid from "@material-ui/core/Grid";
// import * as getDataApi from "../../src/utils/getDataApi";
import { connect } from "react-redux";

const styles = (theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 500,
    height: 450,
  },
  card: {
    padding: 8,
    margnTop: 4,
    maxWidth: 300,
    margin: "auto",
    transition: "0.3s",
    boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
    "&:hover": {
      boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)",
    },
  },
  caption: {
    maxWidth: "60%",
  },
  media: {
    width: "100%",
    margnTop: "5em",
    paddingTop: "100%",
  },
  content: {
    textAlign: "left",
    padding: theme.spacing.unit * 3,
  },
  divider: {
    margin: `${theme.spacing.unit * 3}px 0`,
  },
  heading: {
    fontWeight: "bold",
  },
  subheading: {
    lineHeight: 1.8,
  },
  avatar: {
    display: "inline-block",
    border: "2px solid white",
    "&:not(:first-of-type)": {
      marginLeft: theme.spacing.unit,
    },
  },
  cardLink: {
    textDecoration: 'none',
    "&:hover":{
      backgroundColor: "transparent"
    }
  }
});

class Answered extends React.Component {

  constructor(props) {
    super(props);
    this.state = { influencerList: [] };
  }
  
 

  render() {
    const { classes, poll } = this.props;

    if (poll === null) {
      return <p>This poll doesn't exist</p>;
    }

    const { optionOne, optionTwo } = poll;
    const { id } = this.props;

    const whoList = (
    
      // 
      <Link underline='none' to={`/questions/${id}`} className={classes.cardLink}>
   
      <Card className={classes.card} >
        <CardContent className={classes.content}>
          <Typography variant="h6" gutterBottom color="primary">
            Would You Rather
          </Typography>
        
          <Typography
            className={"MuiTypography--subheading"}
            variant="subtitle1"
          >
            {optionOne.text}
          </Typography>

          <Divider className={classes.divider} light />
          <Typography
            className={"MuiTypography--subheading"}
            variant="subtitle1"
          >
            {optionTwo.text}
          </Typography>
         
        </CardContent>
      </Card>
      
      </Link>
    );
    return whoList;
  }
}

function mapStateToProps({ authedUser, polls }, { id }) {
  const poll = polls[id];

  return {
    authedUser,
    poll,
    id,
  };
}

export default connect(mapStateToProps)(
  withStyles(styles, { withTheme: true })(Answered)
);
