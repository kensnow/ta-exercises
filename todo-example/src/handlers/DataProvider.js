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

    getTodos = async () => {
        try{
            let res = await Axios.get(url) 
            this.setState({
                todos:res.data
        
            })
        }
        catch(err){
            this.setState({
                errMsg: err
            })
        }     
    }

    addTodo = async (todo) => {
        try{
            let res = await Axios.post(url, todo)
            this.setState(ps => ({
                todos: [...ps.todos, res.data]
            }))
        }
        catch(err){
            this.setState({
                errMsg:err
            })
        }
    }

    deleteTodo = async (id) => {
        try{
            let res = await Axios.delete(url + "/" + id)
            const foundTodoIndex = this.state.todos.map(todo => (todo._id)).indexOf(id)
            const todosArr = this.state.todos
            todosArr.splice(foundTodoIndex,1)
            this.setState({
                todos: [...todosArr]
            })
        }
        catch(err){
            this.setState({
                errMsg:err
            })
        }
    }

    editTodo = async (id, todo) => {
        try{
            let res = await Axios.put(url + "/" + id,{...todo})
            const foundTodoIndex = this.state.todos.map(todo => (todo._id)).indexOf(id)
            const todosArr = this.state.todos
            todosArr.splice(foundTodoIndex,1,res.data)
            this.setState({
                todos: [...todosArr]
            })
        }
        catch(err){
            this.setState({
                errMsg: err
            })
        }
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