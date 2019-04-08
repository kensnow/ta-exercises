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
    todos:[objectId]

})

profileSchema.pre('save', function(next){
    const user = this
    if(!user.isModified('password')) return next()
    bcrypt.hash(user.password, 10, (err, hash) => {
        if (err) return next(err)
        user.password = hash;
        next()
    })
})


profileSchema.methods.checkPassword = function(passwordAttempt, callback){
    bcrypt.compare(passwordAttempt, this.password, (err, isMatch) => {
        if (err) return callback(err)
        callback(null, isMatch)
    })
}

profileSchema.methods.withoutPassword = function (){
    const user = this.toObject()
    delete user.password
    return user

}

module.exports = mongoose.model('Profile', profileSchema)