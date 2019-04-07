import React, { Component, createContext } from 'react'
import axios from 'axios'

const {Consumer, Provider} = createContext()

const profileAxios = axios.create()
profileAxios.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')
    config.headers.Authorization = `Bearer ${token}`
    return config
})

export default class TodoProvider extends Component {
    constructor(props){
        super(props)
        this.state = {
            userTodos:[],
            errMsg:''
        }
    }

    getTodos = () => {
        profileAxios.get('/api/todo')
            .then(res => {
                this.setState({
                    userTodos: res
                })
            })
            .catch(err => {
                this.setState({
                    errMsg: err
                })
            })
    }

    addTodo = (todo) => {
        //add todo
        profileAxios.post('/api/todo', todo)
            .then(res => {
                console.log(res)
                
            })
            .catch(err => {

            })
    }

    editTodo = (todoId, userId) => {
        //edit todo
    }

    deleteTodo = (todoId, userId) => {
        //delete todo from user object
    }

    render() {
        const value = {
            getTodos: this.getTodos,
            addTodo: this.addTodo,
            editTodo: this.editTodo,
            deleteTodo: this.deleteTodo,
            ...this.state
        }
        return (
            <Provider value={value}>
                {this.props.children}
            </Provider>
        )
    }
}

export const withTodoProvider = C => props => (
    <Consumer>
        {values => <C {...values} {...props}/>}
    </Consumer>
)