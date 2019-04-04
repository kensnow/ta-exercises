const express = require('express')
const jwt = require('jsonwebtoken')
const authRouter = express.Router()
const Profile = require('../models/profile')

authRouter.post('/signup',(req,res,next) => {
        const email = req.body.email
        console.log(email)
        //check for existing user
        Profile.findOne({email:email}, (err, existingProfile) => {
            if (err){
                res.status(500)
                return next(err)
            } else if (existingProfile !== null){
                res.status(400)
                return next(new Error('Email already exists'))
            } else {
                const newProfile = new Profile(req.body)
                newProfile.save((err, returnedProfile) => {
                    if(err){
                        res.status(500)
                        return next(err)
                    } else {
                        const token = jwt.sign(returnedProfile.toObject(),process.env.SECRET)
                        return res.status(201).send({success:true, user:returnedProfile.toObject(), token})
                    }
                })
            }
        })
    })

authRouter.post('/login', (req, res, next) => {
    const email = req.body.email
    Profile.findOne({email:email.toLowerCase()}, (err, foundProfile) => {
        if (err){
            return next(err)
        } else if (!foundProfile || foundProfile.password !== req.body.password){
            res.status(403)
            return next(new Error('email or password incorrect'))
        } else {
            const token = jwt.sign(user.toObject(), process.env.SECRET)
            return res.send({token: token, user:foundProfile.toObject(), success: true})
        }
    })
})

module.exports = authRouter