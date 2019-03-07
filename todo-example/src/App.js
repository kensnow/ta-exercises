import React from 'react'
import TodoForm from './TodoForm'
import {withDataProvider} from './handlers/DataProvider'
import TodoCard from './TodoCard'

function App(props) {
    const todoGroup = props.todos.map((todo, i) => <TodoCard key={i} provider={props} todo={todo}/>)
    return (
        <div>
            <TodoForm todo={null}/>
            {todoGroup}
        </div>
    )
}

export default withDataProvider(App)
