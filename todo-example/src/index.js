import React from 'react'
import { render } from 'react-dom'
import DataProvider from './handlers/DataProvider'
import App from './App'
import Toggler from './handlers/Toggler'

render(
    <DataProvider>
            <App/>
    </DataProvider>,
    document.getElementById('root')

)