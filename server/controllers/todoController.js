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
                })
        })
    }

    static addTodo(req, res) {
        // console.log(req.body)
        let todoId;
        let todoAdded;
        Todo.create({
            name: req.body.name,
            description: req.body.description,
            user: req.body.user,
            due_date: req.body.due_date
        })
        .then(newTodo => {
            // console.log(newTodo)
            todoId = newTodo._id
            todoAdded = newTodo
            return User.findOne({
                _id: newTodo.user
            })
        })
        .then(user => {
            user.todos.push(todoId)
            user.save()
            // console.log(user)
            res
                .status(201)
                .json({
                    msg: `New Todo has been created`,
                    data: todoAdded
                })        
        })
        .catch(err => {
            console.log(err)
            res
                .status(500)
                .json({
                    msg: `Internal Server Error`,
                    err: err
                })            
        })
    }
    
    static delete(req, res) {
        Todo.deleteOne({
            _id: req.params.id
        })
        .then(deleted => {
            res
                .json({
                    msg: `Todo has been removed`
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
    
    static findTodo(req, res) {
        Todo.findById(req.params.id)
        .then(todo => {
            res
                .status(200)
                .json(todo)
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

    static update(req, res) {
        Todo.findByIdAndUpdate(req.params.id, req.body, {new: true})
        .then(newUpdate => {
            res
                .status(200)
                .json({
                    msg: 'Todo successfully been updated',
                    data: newUpdate
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