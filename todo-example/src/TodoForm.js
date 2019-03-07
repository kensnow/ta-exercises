import React from 'react'
import FormHandler from './handlers/FormHandler'
import {withDataProvider} from './handlers/DataProvider'

function TodoForm(props) {
    //todo props
    
    const todoInputs = {
        title: props.todo ? props.todo.title : "",
        description:props.todo ? props.todo.description : "",
        price:props.todo ? props.todo.price : 10
    }
    console.log(props)
    return(
        <FormHandler inputs={todoInputs} submit={(todoInputs) => props.addTodo(todoInputs)} >
            {
                ({ handleChange, handleSubmit }) => {
                    return(
                        <form onSubmit={handleSubmit}>
                            <input onChange={handleChange} type="text" placeholder={props.todo ? props.todo.title : "Enter title here"} name="title"/>
                            <input onChange={handleChange} type="text" placeholder={props.todo ? props.todo.description : "Enter description here"} name="description"/>
                            <input onChange={handleChange} type="number" placeholder={props.todo ? props.todo.price : "Value"} name="price"/>
                            <button>Add Todo</button>
                        </form>
                    )
                }
            }
        </FormHandler>
    )
}

export default withDataProvider(TodoForm)