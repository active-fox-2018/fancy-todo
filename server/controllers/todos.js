const { Todo } = require('../models')

module.exports = {
    create(req, res) {
        let newTodo = {
            userId: req.user._id,
            name: req.body.name,
            description: req.body.description,
            due_date: req.body.due_date,
            status: req.body.status
        }
        Todo
            .create(newTodo)
            .then(todo => {
                res.status(201).json(todo)
            })
            .catch(err => {
                res.status(500).json({
                    msg: 'internal server error',
                    err: err
                })
            })
    },
    getAll(req, res) {
        Todo
            .find({userId: req.user._id})
            // .populate('userId')
            .then(todos => {
                res.status(200).json(todos)
            })
            .catch(err => {
                res.status(500).json({
                    msg: 'internal server error',
                    err: err
                })
            })
    },
    getOne(req, res) {
        Todo
            .findById(req.params.todoId)
            .then(todo => {
                res.status(200).json(todo)
            })
            .catch(err => {
                res.status(500).json({
                    msg: 'internal server error',
                    err: err
                })
            })
    },
    update(req, res) {
        let newTodo = {
            name: req.body.name,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date
        }
        for (const key in newTodo) {
            if (!newTodo[key]) {
                delete newTodo[key]
            } else if (newTodo[key] === 'Invalid Date') {
                delete newTodo[key]
            }
        }
        Todo
            .findByIdAndUpdate(req.params.todoId, newTodo, {new: true})
            .then(todo => {
                res.status(200).json(todo)
            })
            .catch(err => {
                console.log(err);

                res.status(500).json({
                    msg: 'internal server error',
                    err: err
                })
            })
    },
    delete(req, res) {
        Todo
            .findByIdAndRemove(req.params.todoId)
            .then(todo => {
                res.status(200).json(todo)
            })
            .catch(err => {
                res.status(500).json({
                    msg: 'internal server error',
                    err: err
                })
            })
    }
}