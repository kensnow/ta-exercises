const express = require('express')
const jwt = require('jsonwebtoken')
const authRouter = express.Router()
const Profile = require('../models/profile')

authRouter.post('/signup',(req,res,next) => {
        const email = req.body.email.toLowerCase()
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
                        const token = jwt.sign(returnedProfile.withoutPassword(),process.env.SECRET)
                        return res.status(201).send({success:true, user:returnedProfile.withoutPassword(), token})
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
        } else if (!foundProfile){
            res.status(403)
            return next(new Error('email or password incorrect'))
        } else {
            foundProfile.checkPassword(req.body.password, (err, match) => {
                if (err) return res.status(500).send(err)
                if (!match) res.status(401).send({success:false, message:"email or password incorrect"})
                const token = jwt.sign(foundProfile.withoutPassword(), process.env.SECRET)
                return res.send({token: token, user: foundProfile.withoutPassword(), success: true})
            })


           
        }
    })
})

module.exports = authRouter