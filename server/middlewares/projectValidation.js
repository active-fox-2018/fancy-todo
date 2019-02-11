const User = require('../models/User')
const Project = require('../models/Project')
const ObjectId = require('mongoose').Types.ObjectId

module.exports = {
    projectInviteAuth: (req, res, next) => {
        User.findOne({email: req.body.memberEmail})
        .then(user => {
            if(!user) {
                res.status(400).json({msg: 'user not found'})
            } else if (user) {
                user.projectsInvitation.forEach(element => {
                    if(element == req.body.projectId) {
                        res.status(400).json({msg: 'sudah di invite'})
                    } 
                });
            } 
            return Project.findOne({_id: req.body.projectId, members: ObjectId(user._id)})
        })
        .then(user => {
            if(user) {
                res.status(400).json({msg: 'sudah masuk Project'})
            } else {
                next()
            }
        })
        .catch(err => {
            res.status(500).json(err)
        })
    },
    deleteValidation: (req, res, next) => {
        Project
            .findById(req.params.id)
            .then(project => {
                if(project.ownerId.toString() == req.current_user._id.toString()) {
                    next()
                } else {
                    res.status(400).json({msg: `you're not admin`})
                }
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }
}