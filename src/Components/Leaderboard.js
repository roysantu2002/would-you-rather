import React, { Component } from 'react'
import Navbar from './Navbar'
import { Typography } from '@material-ui/core'
import { connect } from 'react-redux'

default class  extends Component {
    render() {
        return (
            <div>
                {/* <Navbar/> */}
                
                <Typography variant="h1"> Leader Board</Typography>
                <Typography variant="h1"> Leader Board</Typography>
                <Typography variant="h1"> Leader Board</Typography>
                <Typography variant="h1"> Leader Board</Typography>
            </div>
        )
    }
}

function mapStateToProps ({ users }) {
    const data = Object.keys(users).map((uid) => {
      return {
        uid,
        pollsCreated: users[uid].questions.length,
        pollsAnswered: Object.keys(users[uid].answers).length
      }  
    }).sort((a, b) => (b.pollsCreated + b.pollsAnswered) - (a.pollsCreated + a.pollsAnswered))

    return {
        users,
        data
    }
}

export default connect(mapStateToProps)(Leaderboard)