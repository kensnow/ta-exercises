const express = require('express')
const todoRouter = express.Router()
const Todo = require('../models/todo')


todoRouter.route('/')
    .get((req, res, next) => {
        Todo.find()
            .then(todoCollection => res.status(200).send(todoCollection))
            .catch(err => {
                res.status(500)
                next(err)
            })
    })
    .post((req,res,next) => {
        const todoData = req.body
        const todoDoc = new Todo(todoData)
        todoDoc.save()
            .then(savedTodo => res.status(201).send(savedTodo))
            .catch(err => {
                res.status(500)
                next(err)
            })
    })

todoRouter.route('/:id')
    .get((req, res, next) => {
        const id = req.params.id
        Todo.findById(id)
            .then(foundTodo => res.status(200).send(foundTodo))
            .catch(err => {
                res.status(500)
                next(err)
            })
    })
    .delete((req, res, next) => {
        const id = req.params.id
        Todo.findByIdAndDelete(id)
            .then(() => res.status(204).send())
            .catch(err => {
                res.status(500)
                next(err)
            })
    })
    .put((req, res, next) => {
        const id = req.params.id
        const updates = req.body
        Todo.findByIdAndUpdate(id, updates, {new:true})
            .then(updatedTodo => res.status(200).send(updatedTodo))
            .catch(err => {
                res.status(500)
                next(err)
            })
    })

module.exports = todoRouter