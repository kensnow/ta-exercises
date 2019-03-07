const mongoose = require('mongoose')


const todoSchema = new mongoose.Schema({

    title:{
        type:String,
        required:true
    },
    description:String,
    price: Number,
    completed:Boolean

})

module.exports = mongoose.model('Todo',todoSchema)