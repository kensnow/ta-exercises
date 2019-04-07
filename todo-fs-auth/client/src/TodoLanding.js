import React from 'react'
import TodoForm from './TodoForm'
import TodoCard from './TodoCard'
import {withProfileProvider} from './providers/ProfileProvider'


function TodoLanding(props) {
    console.log(props)
    return (
        <div>
            <TodoForm />
        </div>
    )
}

export default withProfileProvider(TodoLanding)
