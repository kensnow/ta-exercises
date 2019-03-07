const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const morgan = require('morgan')
const app = express()

//app middleware
app.use(express.json())
app.use(morgan('dev'))

app.use('/api/todos', require('./routes/todo'))

app.use((err, req, res, next) => {

    if(err.name === "UnauthorizedError"){
        res.status(err.status)
    }
    return(res.send(err.message))
})

mongoose.connect(process.env.MONGODB_URI, () => {
    console.log('Connected to MongoDB')
})

app.listen(process.env.PORT, () => (
    console.log('listening on port ' + process.env.PORT)
))