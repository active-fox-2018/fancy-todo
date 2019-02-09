const Todo = require('../models/todo')
const User = require('../models/user')

class Controller {
    static todolist(req, res) {
        Todo.find()
        .then(todolist => {
            res
                .status(200)
                .json(todolist)
        })
        .catch(err => {
            res
                .status(500)
                .json({
                    msg: `Internal Server Error`,
                    err: err
                    // pathValidation: modelValidation
                })
        })
    }

    static addTodo(req, res) {
        let todoId;
        Todo.create({
            name: req.body.name,
            description: req.body.description,
            user: req.body.user
        })
        .then(newTodo => {
            todoId = newTodo._id
            return User.findOne({
                _id: newTodo.user
            })
        })
        .then(user => {
            user.todos.push(todoId)
            user.save()
            res
                .status(201)
                .json({
                    msg: `New Todo has been created`,
                    data: newTodo
                })        
        })

        .catch(err => {
            res
                .status(500)
                .json({
                    msg: `Internal Server Error`,
                    err: err
                })            
        })
    }
}

module.exports = Controller