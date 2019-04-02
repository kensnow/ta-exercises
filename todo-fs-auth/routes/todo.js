const express = require('express')
const Todo = require('../models/todo')
const Profile = require('../models/profile')


const todoRouter = express.Router()

todoRouter.route('/')
    .get((req, res, next) => {
        const profileId = req.body.user._id
        Profile.findById(profileId)
            .then(profile => {
                Todo.find({
                    _id : {$in: profile.todos}
                })
                .then(todoArr => res.status(200).send(todoArr))
                .catch(err => {
                    res.status(500)
                    next(err)
                })
        })
    })
    .post((req, res, next) => {
        const todoData = req.body.todo
        const todoDoc = new Todo (todoData)
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
        userId = req.body.todo.user
        Todo.findByIdAndDelete(todoId)
            .then(() => {
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
            .catch(err => {
                res.status(500)
                next(err)
            })
    })