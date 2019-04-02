const mongoose = require('mongoose')
const objectId = mongoose.Schema.Types.ObjectId

const todoSchema = new mongoose.Schema({
    user: {
        type:objectId,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    description: String,
    isComplete: {
        type: Boolean,
        default: false
    },
    value:{
        type:Number,
        default: 5
    },
    createdOn:{
        type:Date,
        default: Date.now()
    },
    completedOn:Date,
})

module.exports = mongoose.model('Todo', todoSchema)
    
