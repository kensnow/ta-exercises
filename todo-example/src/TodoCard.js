import React from 'react'
import {withToggler} from './handlers/Toggler'
import TodoForm from './TodoForm'

function TodoCard(props) {
    const {_id, completed, title, description, price, imgUrl} = props.todo
    const {deleteTodo, editTodo} = props.provider
    console.log(props)
    return (
        <>
        {props.on ? 
            <TodoForm {...props.todo}/>:         
            <div className="todo-card">
                <button onClick={() => props.toggleSwitch()}>Edit</button>
                <button onClick={() => deleteTodo(_id)}>X</button>
                <h3>{title}</h3>
                <p>{description}</p>
                <ul>
                    <li>status: {completed}</li>
                    <li>{price}</li>
                </ul>
            </div>}
        </>
    )
}

export default withToggler(TodoCard)