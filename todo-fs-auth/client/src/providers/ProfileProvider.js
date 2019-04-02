import React, { Component, createContext } from 'react'

const {Consumer, Provider} = createContext()

export default class ProfileProvider extends Component {
    
    
    render() {
        value = {
            ...this.state
        }
        return (
            <Provider value={value}>
                {this.props.children} 
            </Provider>
        )
    }
}


export const withProfileProvider = C => props => {
    <Consumer>
        {value => <C {...cProps} {...props}/>}
    </Consumer>
}