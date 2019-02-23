const Task = require('../models/Task')
const ObjectId = require('mongoose').Types.ObjectId

module.exports = {
    createTask: (req, res) => {
        let newTask = { title, description, dueDate } = req.body
        newTask.userId = req.current_user._id
        Task
            .create(newTask)
            .then(task => {
                res.status(201).json(task)
            })
            .catch(err => {
                res.status(500).json(err.message)
            })
    },
    findAllTask: (req, res) => {
        Task
            .find({userId: ObjectId(req.current_user._id)})
            .then(tasks => {
                res.status(200).json(tasks)
            })
            .catch(err => {
                res.status(500).json(err.message)
            })
    },
    findOneTask: (req, res) => {
        Task
            .findById(req.params.id)
            .then(task => {
                res.status(200).json(task)
            })
            .catch(err => {
                res.status(500).json(err.message)
            })
    },
    updateTask: (req, res) => {
        let updatedData = { title, description, status } = req.body
        for(let key in updatedData) {
            if(!updatedData[key]) delete updatedData[key]
        }
        Task
            .findByIdAndUpdate(req.params.id, {$set: updatedData}, {new: true})
            .then(updatedTask => {
                res.status(200).json(updatedTask)
            })
            .catch(err => {
                res.status(500).json(err.message)
            })
    },
    deleteTask: (req, res) => {
        Task
            .findByIdAndDelete(req.params.id)
            .then(deletedTask => {
                res.status(200).json(deletedTask)
            })
            .catch(err => {
                res.status(500).json(err.message)
            })
    },
}