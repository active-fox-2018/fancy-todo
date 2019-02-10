const Users = require('../models/user')
const Todo = require('../models/todo')
const Project = require('../models/project')

class todoController {

    static create(req, res) {
        let newTodo = ''
        console.log(req.params)
        console.log(req.body);


        Todo.create({
            name: req.body.name,
            description: req.body.description,
            dueDate: req.body.dueDate
        })
            .then(todo => {
                newTodo = todo
                if (req.body.owner == 'user') {
                    return Users.findOneAndUpdate({ email: req.body.email }, { $push: { todoList: newTodo._id } }, { new: true })
                        .then(user => {
                            res.status(201).json({ message: 'todo created' })
                        })

                } else {
                    return Project.findOneAndUpdate({ _id: req.body.id }, { $push: { todoList: newTodo._id } }, { new: true })
                        .then(data => {
                            res.status(201).json({ message: 'todo created' })
                        })
                }


            })
            .catch(err => {
                res.status(500).json({ message: 'internal server error' })
            })
    }

    static update(req, res) {
        Todo.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
            .then(data => {
                res.status(200).json({ message: 'data updated' })
            })
            .catch(err => {
                res.status(500).json({ message: 'internal server error' })
            })
    }

    static delete(req, res) {
        Todo.findOneAndDelete({ _id: req.params.id })
            .then(() => {
                res.status(200).json({ message: 'data deleted' })
            })
            .catch(err => {
                res.status(500).json({ message: 'internals server error' })
            })
    }
}

module.exports = todoController