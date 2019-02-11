const Task = require('../models/task')
const List = require('../models/list')

class TaskController {

    static allTask(req, res) {
        console.log(req.params.listId)
        Task
            .find({listId: req.params.listId})
            .populate('members')
            .then((tasks) => {
                console.log('=====')
                console.log(tasks)

                res.status(200).json(tasks)
            })
            .catch((err) => {
                res.status(500).json({status: 'Internal Server Error'})
            })
    }

    static findTask(req, res) {
        Task
            .findById(req.params.taskId)
            .populate('assignTo')
            .populate({ 
                path: 'listId',
                populate: {
                  path: 'members master',
                  model: 'User'
                } 
             })
            .then((task) => {
                if (!task) {
                    res.status(404).json({status: 'Task Not Found'})
                } else {
                    res.status(200).json(task)
                }    
            })            
            .catch((err) => {
                res.status(500).json({status: 'Internal Server Error'})
            })
    }

    static createTask(req, res) {
        console.log(req.body)
        req.body
        Task
            .create(req.body)
            .then((task) => {
                res.status(201).json(task)
            })
            .catch((err) => {
                res.status(401).json({status: err.message})
            })
    }

    static editTask(req, res) {
        Task
            .findOneAndUpdate({_id: req.params.taskId}, req.body, {new: true})
            .then((updated) => {
                res.status(200).json(req.body)
            })
            .catch((err) => {
                console.log('===', err)

                res.status(500).json({status: 'Internal Server Error'})
            })
    }

    static deleteTask(req, res) {
        Task
            .deleteOne({_id: req.params.taskId})
            .then(() => {
                res.status(200).json({status: 'Task Deleted'})
            })
            .catch((err) => {
                res.status(500).json({status: 'Internal Server Error'})
            })
    }
}

module.exports = TaskController