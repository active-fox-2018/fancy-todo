const Todo = require('../models/todo')

class TodoController {
    static create(req, res) {
        Todo
            .create({
                name: req.body.name,
                description: req.body.description,
                status: req.body.status,
                dueDate: req.body.dueDate
            })
            .then((createResult => {
                res.status(201).json({ msg: `todo created`, data: createResult })
            }))
            .catch(err => {
                res.status(500).json({ err: err.message })
            })
    }

    static findAll(req, res) {
        Todo
            .find({})
            .then(findResult => {
                res.status(200).json({ msg: `array of find result`, data: findResult })
            })
            .catch(err => {
                res.status(500).json({ err: err.message })
            })
    }
}

module.exports = TodoController