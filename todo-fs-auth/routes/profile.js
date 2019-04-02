const express = require('express')
const Profile = require('../models/profile')
const profileRouter = express.Router()

profileRouter.route('/')
    .post((req, res, next) => {
        const profileDat = req.body
        const newProfile = new Profile(profileDat)
        newProfile.save()
            .then(savedProfile => res.statue(201).send(savedProfile))
            .catch(err => {
                res.state(500)
                next(err)
            })
    })

profileRouter.route('/:id')
    .get((req, res, next) => {
        const id = req.params.id
        Profile.findById(id)
            .then(foundProfile => res.status(200).send(foundProfile))
            .catch(err => {
                res.status(500)
                next(err)
            })
    })
    .put((req, res, next) => {
        const id = req.params.id
        const profileUpdates = req.body
        Profile.findByIdAndUpdate(id, profileUpdates, { new: true })
            .then(updatedProfile => res.status(200).send(updatedProfile))
            .catch(err => {
                res.status(500)
                next(err)
            })
    })
    .delete((req, res, next) => {
        const id = req.params.id
        Profile.findByIdAndDelete(id)
            .then(() => res.status(204).send("Delete Successful of id: " + id))
            .catch(err => {
                res.status(500)
                next(err)
            })
    })

module.exports = profileRouter