const Project = require('../models/Project')
const User = require('../models/User')
const ObjectId = require('mongoose').Types.ObjectId

module.exports = {
    createProject: (req, res) => {
        let newProject = { name } = req.body
        newProject.ownerId = req.current_user._id
        newProject.ownerName = req.current_user.name
        newProject.members = req.current_user._id
        Project
            .create(newProject)
            .then(project => {
                return project.populate('members').execPopulate();
            })
            .then(populated => {
                res.status(200).json(populated)
            })
            .catch(err => {
                res.status(500).json(err.message)
            })
    },
    findAllProject: (req, res) => {
        Project
            .find({members: ObjectId(req.current_user._id)})
            .populate('members')
            .then(projects => {
                res.status(200).json(projects)
            })
            .catch(err => {
                res.status(500).json(err.message)
            })
    },
    findOneProject: (req, res) => {
        Project
            .findById(req.params.id)
            .then(project => {
                res.status(200).json(project)
            })
            .catch(err => {
                res.status(500).json(err.message)
            })
    },
    addProjectMember: (req, res) => {
        Project
            .findByIdAndUpdate(req.params.id, {$push: {members: req.current_user._id}}, {new: true})
            .then(updated => {
                return updated.populate('members').execPopulate()
            })
            .then(populated => {
                res.status(200).json(populated)
            })
            .catch(err => {
                res.status(500).json(err)
            })
        User
            .findByIdAndUpdate(req.current_user._id, {$pull: {projectsInvitation: req.params.id}})
            .then(result => {
                console.log('yatta')
            })
            .catch(err => {
                console.log(err)
            })
    },
    deleteProject: (req, res) => {
        Project
            .findByIdAndDelete(req.params.id)
            .then(deleted => {
                res.status(200).json(deleted)
            })
            .catch(err => {
                res.status(500).json(err.message)
            })
    },
    groupInvitation: (req, res) => {
        User
            .findOne({email: req.body.memberEmail})
            .then(user => {
                user.projectsInvitation.push(req.body.projectId)
                return user.save()
            })
            .then(saved => {
                res.status(200).json(saved)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    },
    removeMember: (req, res) => {
        Project
            .findByIdAndUpdate(req.params.id, {$pull: {members: req.body.memberId}}, {new: true})
            .then(updated => {
                return updated.populate('members').execPopulate()
            })
            .then(populated => {
                res.status(200).json(populated)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }
}