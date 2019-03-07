import React, { Component, createContext } from 'react'
import Axios from 'axios';
// import TodoForm from '../TodoForm'

export const {Consumer, Provider} = createContext()

const url = "https://api.vschool.io/ken_snow/todo"

export default class DataProvider extends Component {
    constructor(){
        super();
        this.state = {
            todos:[],
            errMsg:''
        }
    }

    getTodos = () => {

        return Axios.get(url)
            .then(res =>(
                this.setState({
                    todos:res.data
           
                })
            ))
            .catch(err => {
                this.setState({
                    errMsg: err
                })
            })        
    }

    addTodo = (todo) => {
        return Axios.post(url, todo)
            .then(res => {
                this.setState(ps => ({
                    todos: [...ps.todos, res.data]
                }))
            })
            .catch(err => {
                this.setState({
                    errMsg:err
                })
            })
    }

    deleteTodo = (id) => {
        return Axios.delete(url + "/" + id)
            .then(res => {
                const foundTodoIndex = this.state.todos.map(todo => (todo._id)).indexOf(id)
                const todosArr = this.state.todos
                todosArr.splice(foundTodoIndex,1)
                this.setState({
                    todos: [...todosArr]
                })

            })
            .catch(err => {
                this.setState({
                    errMsg:err
                })
            })
    }

    editTodo = (id) => {
        const foundTodo = this.state.todos.find(todo => (todo._id === id))
        console.log(foundTodo)
        // return(
        //     <Form>
        // )
    }

    componentDidMount = () => {
        this.getTodos()
    }

    render() {
        const value = {
            ...this.state,
            addTodo:this.addTodo,
            deleteTodo:this.deleteTodo,
            editTodo:this.editTodo
        }
        return (
            <Provider value={value}>
                {this.props.children}
            </Provider>
        )
    }
}


export const withDataProvider = C => props => (
    <Consumer>
        {value =>  <C {...value}{...props} />}
    </Consumer>
)