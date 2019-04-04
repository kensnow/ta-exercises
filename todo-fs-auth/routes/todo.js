const express = require('express')
const Todo = require('../models/todo')
const Profile = require('../models/profile')


const todoRouter = express.Router()

todoRouter.route('/')
    .get((req, res, next) => {
        const profileId = req.user._id
        Profile.find({user: profileId}, (err, todos) => {
            if (err){
                res.status(500)
                return next(err)
            } else {
                return res.send(todos)
            }
        })



    })
    .post((req, res, next) => {
        const todoData = req.body
        const todoDoc = new Todo (todoData)
        todoDoc.user = req.user._id
        todoDoc.save()
            .then(savedTodo => {
                const profileId = req.body.user._id
                Profile.findById(profileId)
                    .then(profile => {
                        profile.todos.push(savedTodo._id)
                        res.status(200).send(savedTodo)
                    })
                    .catch(err => {
                        res.status(500)
                        next(err)
                    })

            })
            .catch(err => {
                res.status(500)
                next(err)
            })

    })

todoRouter.route('/:id')
    .put((req, res, next) => {
        todoId = req.params
        todoUpdates = req.body.todo
        Todo.findByIdAndUpdate(todoId, todoUpdates, {new: true})
            .then(updatedTodo => res.status(200).send(updatedTodo))
            .catch(err => {
                res.status(500)
                next(err)
            })
    })
    
    .delete((req, res, next) => {
        todoId = req.params
        userId = req.user
        //set up so server saves all todos, only users delete id from thier user object
        Profile.findById(userId)
            .then(foundUser => {
                const todoIndex = foundUser.todos.find(todoRef => todoRef === todoId).indexOf()
                foundUser.todos.splice(todoIndex, 1)
                foundUser.save()
                res.status(200).send('Delete Complete')
            })
            .catch(err => {
                res.status(500)
                next(err)
            })

    })

    module.exports = todoRouter