import React from 'react'
import {Route} from 'react-router-dom'
import SignUp from './SignUp'
import LogIn from './LogIn'
import Welcome from './Welcome'
import TodoLanding from './TodoLanding'
import ProtectedRoute from './providers/ProtectedRoute'


function MainViewRouter() {
    return (
        <div>
            <Route exact path='/' component={Welcome}/>
            <Route path='/login' component={LogIn}/>
            <Route path='/signup' component={SignUp}/>
            <ProtectedRoute exact path='/todo' component={TodoLanding}/>
            
        </div>
    )
}

export default MainViewRouter
