const Task = require('../models/Task')
const Project = require('../models/Project')
const ObjId = require('mongoose').Types.ObjectId

class TaskController {
    static findAll (req, res) {
        let q = {}
        if (req.headers.type == 'me') {
            q = { user: ObjId(req.currentUser._id) }
        }

        Task.find(q).populate({ path: 'project', populate: { path: 'member' } }).populate('user').exec()
            .then(list => {
                res.status(200).json(list)
            })
            .catch(err => {
                res.status(500).json({
                    msg: err.message
                })
            })
    }

    static findOne (req, res) {
        res.status(200).json(req.currentTask)
    }

    static create (req, res) {
        let title = req.body.title
        let description = req.body.description
        let user = req.currentUser._id
        let deadline = undefined
        if (req.body.deadline) {
            deadline = new Date(req.body.deadline)  
        }
        let project = req.projectId

        if (!title || !description || !user ) {
            res.status(400).json({
                msg: `Please input required data`
            })
        } else {
            let newTask = {
                title,
                description,
                user,
                deadline,
                project
            }

            for (let i in newTask) {
                if (!newTask[i]) {
                    delete newTask[i]
                }
            }
            Task.create(newTask)//.populate({ path: 'project', populate: { path: 'member' } }).populate('user').exec()
                .then(created => {
                    if (project) {
                        Project.update({_id: ObjId(project)}, {$push: {task: created._id}}, (err, success) => {
                            if (err) {
                                res.status(500).json({
                                    msg: err.message
                                })
                            } else {
                                res.status(201).json(created)
                            }
                        })
                    } else {
                        res.status(201).json(created)
                    }
                })
                .catch(err => {
                    res.status(500).json({
                        msg: err.message
                    })
                })
           
        }
    }

    static update (req, res) {
        let id = req.params.id
        let title = req.body.title
        let description = req.body.description
        let status = req.body.status
        let deadline = new Date(req.body.deadline)
        let project = req.body.project

        let upTask = {
            title,
            description,
            status,
            deadline,
            project
        }

        for (let i in upTask) {
            if (!upTask[i]) delete upTask[i]
        }

        Task.findById(id)
            .then(found => {
                if (!found) {
                    res.status(404).json({
                        msg: `Task not found`
                    })
                } else {
                    found.set(upTask)
                    return found.save()
                }
            })
            .then(updated => {
                if (updated) {
                    res.status(200).json(updated)
                }
            })
            .catch(err => {
                res.status(500).json({
                    msg: err.message
                })
            })
    }

    static delete (req, res) {
        Task.findById(req.params.id)
            .then(found => {
                if (!found) {
                    res.status(404).json({
                        msg: `Task not found`
                    })
                } else {
                    return found.remove()
                }
            })
            .then(del => {
                if (del) {
                    if (del.project) {
                        Project.findOneAndUpdate({  _id: ObjId(del.project) }, { $pull: { task: ObjId(del._id) } }, (err, success) =>{
                            if (err) {
                                res.status(500).json({
                                    msg: err.message
                                })
                            } else {
                                res.status(200).json({
                                    msg: `Success delete task`
                                })
                            }
                        })
                    } else {
                        res.status(200).json({
                            msg: `Success delete task`
                        })
                    }
                }
            })
            .catch(err => {
                res.status(500).json({
                    msg: err.message
                })
            })
    }

}
module.exports = TaskController