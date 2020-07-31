import React from 'react'
import { NavLink } from 'react-router-dom'
import Typography from "@material-ui/core/Typography"   


 function NoMatch  () {

        return (
            <div>
                 <Typography variant="subtitle1">Try your luck again!</Typography>
                 <Typography variant="subtitle1"> <NavLink className='click-here' to='/'>Click here</NavLink> to go back to home page</Typography>
            </div>
        )
}
export default NoMatch