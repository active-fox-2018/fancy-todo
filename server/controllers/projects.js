const { Project, Todo } = require('../models')

module.exports = {
    create(req, res) {
        let newProject = {
            userId: req.user._id,
            name: req.body.name
        }
        Project
            .create(newProject)
            .then(project => {
                res.status(200).json(project)
            })
            .catch(err => {
                res.status(500).json({
                    msg: "internal server error",
                    err: err
                })
            })
    },
    myProjects(req, res)  {
        Project
            .find({members: req.user._id})
            .then(projects => {
                res.status(200).json(projects)
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    msg: "internal server error",
                    err: err
                })
            })
    },
    getOne(req, res) {
        Project
            .findById(req.params.projectId)
            .populate('members')
            .populate('todos')
            .then(project => {
                res.status(200).json(project)
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    msg: "internal server error",
                    err: err
                })
            })
    },
    delete(req, res) {
        Project
            .findOneAndDelete(req.params.projectId)
            .then(project => {
                res.status(500).json(project)
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    msg: "internal server error",
                    err: err
                })
            })
    },
    invite(req, res) {
        Project
            .findByIdAndUpdate(req.params.projectId, {$push:  {members: req.params.userId}}, {new: true})
            // .populate("members")
            // .populate("todos")
            .then(project => {
                res.status(200).json(project)
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    msg: "internal server error",
                    err: err
                })
            })
    },
    createTodo(req, res) {
        let newTodo = {
            userId: req.user._id,
            name: req.body.name,
            description: req.body.description,
            due_date: req.body.due_date
        }
        Todo
            .create(newTodo)
            .then(todo => {
                return Project.findByIdAndUpdate(req.params.projectId, {$push: {todos: todo._id}}, {new: true})
            })
            .then(project => {
                res.status(201).json(project)
            })
            .catch(err => {
                res.status(500).json({
                    msg: 'internal server error',
                    err: err
                })
            })
    },
    updateTodo(req, res) {
        let newTodo = {
            name: req.body.name,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date
        }
        for (const key in newTodo) {
            if (!newTodo[key]) {
                delete newTodo[key]
            }
        }
        Todo
            .findByIdAndUpdate(req.params.todoId, newTodo, {new: true})
            .then(todo => {
                return Project.findById(req.params.projectId).populate('todos')
            })
            .then(project => {
                res.status(200).json(project)
            })
            .catch(err => {
                res.status(500).json({
                    msg: 'internal server error',
                    err: err
                })
            })
    },
    deleteTodo(req, res) {
        Project
            .findByIdAndUpdate(req.params.projectId, {
                $pull: { todos: req.params.todoId }
            })
            .then(project => {
                Todo.findByIdAndRemove(req.params.todoId)
            })
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