import React from 'react'
import {Route} from 'react-router-dom'
import SignUp from './SignUp'
import LogIn from './LogIn'
import Welcome from './Welcome'

function MainViewRouter() {
    return (
        <div>
            <Route exact path='/' component={Welcome}/>
            <Route path='/login' component={LogIn}/>
            <Route path='/signup' component={SignUp}/>
            
        </div>
    )
}

export default MainViewRouter
