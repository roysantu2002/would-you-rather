import React from "react"
import { Link } from "react-router-dom"
import { withStyles } from "@material-ui/core/styles"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import Divider from "@material-ui/core/Divider"
import Typography from "@material-ui/core/Typography"
import { connect } from "react-redux"

const styles = (theme) => ({
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
  content: {
    textAlign: "left",
    padding: theme.spacing.unit * 3,
  },
  divider: {
    margin: `${theme.spacing.unit * 3}px 0`,
  },
  cardLink: {
    textDecoration: 'none',
    "&:hover":{
      backgroundColor: "transparent"
    }
  }
})

class Answered extends React.Component {

  constructor(props) {
    super(props)
    this.state = { influencerList: [] }
  }

  render() {
    const { classes, poll } = this.props

    if (poll === null) {
      return <p>This poll doesn't exist</p>
    }

    const { optionOne, optionTwo } = poll
    const { id } = this.props

    const whoList = (
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
    )
    return whoList
  }
}

function mapStateToProps({ authedUser, polls }, { id }) {
  const poll = polls[id]

  return {
    authedUser,
    poll,
    id,
  }
}

export default connect(mapStateToProps)(
  withStyles(styles, { withTheme: true })(Answered)
)
