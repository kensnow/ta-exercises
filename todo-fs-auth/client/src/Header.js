import React from 'react'
import {Link, withRouter} from 'react-router-dom'
import {withProfileProvider} from './providers/ProfileProvider'

function Header(props) {
    console.log(props)
    return (
        <div>
            <h2><Link to='/'>Todooooooooooooo</Link></h2>
            <ul>
                {props.token == '' ? 
                <>                
                <li><Link to='/signup'>Sign Up</Link></li>
                <li><Link to='/login'>Log In</Link></li>
                </> :
                <li><button onClick={() => {
                    props.logOut()
                    props.history.push('/')
                    }}>Log Out</button></li>
                }
            </ul>
        </div>
    )
}

export default withRouter(withProfileProvider(Header))
