import React, { Component } from 'react'
import axios from 'axios'

//import axios...


//create a State-ful componing to process our API calls/requests
//Once API call is resolved, store results in state & send data via context to display component

const api = "https://swapi.co/api/people"
//https://swapi.co/api/people
export default class componentName extends Component {
    constructor(){
        super()
        this.state = {
            data = [] //Star wars response data.response is an array of objects
        }
    }


    getApiDat = () => {
        //make get request, then with the response update state
        axios.get(api)
            .then(res => {
                const apiDat = res.data.results
                this.setState({
                    data: apiDat
                })
            })
    }

    //use a lifecycle method 'component did mount' to ensure that the get request is processed once any component using this DataProvider sends a get request upon loading

    componentDidMount(){
        //function here
        this.getApiDat()
    }


    //
    render() {
        return (
            <Provider>
                {this.props.children}
            </Provider>
        )
    }
}
