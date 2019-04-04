import React, { Component, createContext } from 'react'
import axios from 'axios'

const {Consumer, Provider} = createContext()

export default class ProfileProvider extends Component {
    constructor(){
        super()
        this.state = {
            user:{},
            email:'',
            password:'',
            token:'',
            errMsg:''
        }
    }

    logIn = (userDat) => {
        axios.post('/auth/login', {...userDat})   
            .then(res => {
                const {user, token} = res.data
                this.setState({
                    user,
                    token,
                    password:'',
                    email:''
                })
            })     
    }
    
    signUp = (userDat) => {
        axios.post('/auth/signup', {...userDat})
            .then(res => {
                const {user, token} = res.data
                this.setState({
                    user,
                    token,
                    password:'',
                    email:''
                })
            })
            .catch(err => {
                this.setState({
                    errMsg:err.response.data.message
                })
                console.log(err)
                return err
            })
    }

    render() {
        const value = {
            logIn: this.logIn,
            signUp: this.signUp,
            ...this.state
        }
        return (
            <Provider value={value}>
                {this.props.children} 
            </Provider>
        )
    }
}


export const withProfileProvider = C => props => (
    <Consumer>
        {value => <C {...value} {...props}/>}
    </Consumer>
)