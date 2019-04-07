import React from 'react'
import {render} from 'react-dom'
import {BrowserRouter} from 'react-router-dom'
import App from './App'
import ProfileProvider from './providers/ProfileProvider'
import TodoProvider from './providers/TodoProvider';

render(
    <BrowserRouter>
        <ProfileProvider>
            <TodoProvider>
                <App />
            </TodoProvider>
        </ProfileProvider>
    </BrowserRouter>, document.getElementById('root') 
)