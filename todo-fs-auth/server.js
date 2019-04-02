
const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const expressJWT = require('express-jwt')

const app = express()

app.use(express.json())


app.use('/api', expressJWT({secret: process.env.SECRET}))
// app.use('/auth', require('./routes/auth'))

app.use('/api/profile', require('./routes/profile'))


app.use((err, res, req, next) => {
    if(err.name === "UnauthorizedError"){
        res.status(err.status)
    }
    return res.send(err.message)
})

mongoose.connect(process.env.MONGODB_URI, () => {
    console.log('connected to MANGODB')
})

app.listen(process.env.PORT, () => {
    console.log('listening on port ' + process.env.PORT)
})