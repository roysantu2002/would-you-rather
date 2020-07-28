import React from "react"
import { withStyles } from "@material-ui/core/styles"
import Card from "@material-ui/core/Card"
import CardMedia from "@material-ui/core/CardMedia"
import CardContent from "@material-ui/core/CardContent"
import Typography from "@material-ui/core/Typography"
import Grid from "@material-ui/core/Grid"
import { connect } from "react-redux"

const styles = (theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
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

  media: {
    width: "100%",
    margnTop: "5em",
    paddingTop: "100%",
  },
  content: {
    textAlign: "left",
    padding: theme.spacing.unit * 3,
  }
})

class LeadersCard extends React.Component {
  constructor(props) {
    super(props)
    this.state = { influencerList: [] }
  }
  componentDidMount() {
    const usersId = Object.keys(this.props.users)
    this.setState(() => ({
      influencerList: usersId,
    }))
  }

  render() {
    const { classes, users, dataSet } = this.props

    const leadersList = (
      <Grid container className={classes.root} spacing={2}>
        <Grid item xs={6}>
          <Typography variant="h3" marked="center" align="center">
            Know Who!!
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Grid container justify="center" spacing={2}>
            {dataSet.map((user, index) => (
              <Card className={classes.card}>
                <CardMedia
                  className={classes.media}
                  image={users[user.uid].avatarURL}
                />
                <CardContent className={classes.content}>
                  <Typography variant="h5" gutterBottom>
                    {users[user.uid].name}
                  </Typography>
                  <Typography
                    className={"MuiTypography--heading"}
                    variant={"h6"}
                    gutterBottom
                  >
                    Polls Created : {user.pollsCreated}
                  </Typography>
                  <Typography
                    className={"MuiTypography--subheading"}
                    variant="subtitle1"
                  >
                    Polls Answered : {user.pollsAnswered}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Grid>
        </Grid>
      </Grid>
    )

    return leadersList
  }
}

function mapStateToProps({ users }) {
  const dataSet = Object.keys(users)
    .map((uid) => {
      return {
        uid,
        pollsCreated: users[uid].questions.length,
        pollsAnswered: Object.keys(users[uid].answers).length,
      }
    })
    .sort(
      (a, b) =>
        b.pollsCreated + b.pollsAnswered - (a.pollsCreated + a.pollsAnswered)
    )

  return {
    users,
    dataSet,
  }
}
export default connect(mapStateToProps)(
  withStyles(styles, { withTheme: true })(LeadersCard)
)
