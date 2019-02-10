const Project = require('../models/Project')
const ObjId = require('mongoose').Types.ObjectId

class ProjectController {
    static findAll (req, res) {
        Project.find({ member: ObjId(req.currentUser._id)}).populate('member').populate('task').exec()
            .then(data => {
                // data.member.
                res.status(200).json(data)
            })
            .catch(err => {
                res.status(500).json({
                    msg: err.message
                })
            })
    }

    static findOne (req, res) {
        res.status(200).json(req.currentProject)
    }

    static create (req, res) {
        let newProject = {
            name: req.body.name,
            task: [],
            member: [ req.currentUser._id ] 
        }

        Project.create(newProject)
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                res.status(500).json({
                    msg: err.message
                })
            })
    }

    static addMember (req, res) {
        let checkDuplicate = req.currentProject.member.findIndex(el => String(el) == String(req.member._id))
        if (checkDuplicate == -1) {
            req.currentProject.member.push(req.member._id)
            req.currentProject.save()
                .then(data => {
                    res.status(200).json({
                        data, pic: req.member.image
                    })
                })
                .catch(err => {
                    res.status(500).json({
                        msg: err.message
                    })
                })
        } else {
            res.status(400).json({
                msg: `User already in projects`
            })
        }
    }

    static deleteMember (req, res) {
        let index = req.currentProject.member.findIndex(el => String(el) == String(req.member._id))
        let task = req.currentProject.task.filter(el => String(el.user) == String(req.member._id))
        req.currentProject.member.splice(index, 1)
        req.currentProject.task = task
        req.currentProject.save()
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                res.status(500).json({
                    msg: err.message
                })
            })
    }
    
    static delete (req, res) {
        req.currentProject.remove()
            .then(del => {
                res.status(200).json({
                    msg: `Success del data`
                })
            })
            .catch(err => {
                res.status(500).json({
                    msg: err.message
                })
            })
    }
}

module.exports = ProjectController