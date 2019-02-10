const User = require('../models/user')
const Project = require('../models/Project')
const mongoose = require('mongoose')
const Task = require('../models/Task')
const { verifyJwt } = require('../helpers')

module.exports = {
    verifyUser (req, res, next) {
        if (!req.headers.token) {
            res.status(400).json({
                msg: `Please login first`
            })
        } else {
            try {
                let id = verifyJwt(req.headers.token).id
                User.findById(id)
                    .then(found => {
                        if (!found) {
                            res.status(404).json({
                                msg: `User not found`
                            })
                        } else {
                            req.currentUser = {
                                _id: found._id,
                                name: found.name,
                                email: found.email,
                                image: found.image
                            }
                            next()
                        }
                    })
                    .catch(err =>{
                        res.status(500).json({
                            msg: err.message
                        })
                    })
            } catch (err) {
                res.status(400).json({
                    msg: `Token not valid`
                })
            }
        }
    },
    verifyMongooseId (req, res, next) {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            res.status(400).json({
                msg: `Id is not valid`
            })
        } else {
            next()
        }
    },
    verifyProject (req, res, next) {
        Project.findById(req.params.id) 
            .then(found => {
                if (!found) {
                    res.status(404).json({
                        msg: err.message
                    })
                } else {
                    req.currentProject = found
                    next()
                }
            })
            .catch(err => {
                res.status(500).json({
                    msg: err.message
                })
            })
    },
    verifyTask (req, res, next) {
        Task.findById(req.params.id)
        .then(found => {
            if (!found) {
                res.status(404).json({
                    msg: err.message
                })
            } else {
                req.currentTask = found
                next()
            }
        })
        .catch(err => {
            res.status(500).json({
                msg: err.message
            })
        })
    },
    authorizedUserTask (req, res, next) {
        if (String(req.currentUser._id) !== String(req.currentTask.user)) {
            res.status(401).json({
                msg: `You are not authorized!`
            })
        } else {
            next()
        }
    },
    authorizedProjectMember (req, res, next) {
        Project.findById(req.body.project) 
            .then(found => {
                if (!found) {
                    res.status(404).json({
                        msg: `Project not found`
                    })
                } else {
                    let index = found.member.findIndex(el => {
                        return String(el) == String(req.currentUser._id)
                    })
                    if (index == -1) {
                        res.status(401).json({
                            msg: `You are not authorized`
                        })
                    } else {
                        req.projectId = found._id
                        next()
                    }
                }
            })
            .catch(err => {
                res.status(500).json({
                    msg: err.message
                })
            })
    },
    getmemberId (req, res, next) {
        User.findOne({ email: req.body.member })
            .then(found => {
                if (!found) {
                    res.status(404).json({
                        msg: `User not found`
                    })
                } else {
                    req.member = found
                    next()
                }
            })
            .catch(err => {
                res.status(500).json({
                    msg: err.message
                })
            })
    }
} 