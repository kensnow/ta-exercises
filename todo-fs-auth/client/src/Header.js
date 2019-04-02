import React from 'react'
import {Link} from 'react-router-dom'


function Header() {
    return (
        <div>
            <h2><Link to='/'>Todooooooooooooo</Link></h2>
            <ul>
                <li><Link to='/signup'>Sign Up</Link></li>
                <li><Link to='/login'>Log In</Link></li>
            </ul>
        </div>
    )
}

export default Header
