const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const objectId = mongoose.Schema.Types.ObjectId

const profileSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    todos:[{    
        name:{
            type:String,
            required:true
        },
        description: String,
        value:{
            type:Number,
            default: 5
        },
        createdOn:{
            type:Date,
            default: Date.now()
        },
        completedOn:Date
    }]

})

module.exports = mongoose.model('Profile', profileSchema)