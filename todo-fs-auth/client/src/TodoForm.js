import React from 'react'
import FormProvider from './providers/FormProvider'
import {withTodoProvider} from './providers/TodoProvider'


function TodoForm(props) {
    console.log(props)
    
    let todoInputs = {
        title: props.todo ? props.todo.title : '',
        description: props.todo ? props.todo.description : '',
        value: props.todo ? props.todo.value : ''
    }
    return (
        <FormProvider inputs={todoInputs} submit={(todoInputs) => props.addTodo(todoInputs)}>
            {
                ({handleChange, handleSubmit}) => {
                    return (
                        <form onSubmit={handleSubmit}>
                            <input onChange={handleChange}type="text" name="title" placeholder="title"/>
                            <input type="text" name="description" placeholder="description" onChange={handleChange}/>
                            <input type="number" name="value" placeholder="value" onChange={handleChange}/>
                        
                            <button>Submit</button>
                        </form>     
                    )
                }
            }
        </FormProvider>

    )
}

export default withTodoProvider(TodoForm)
