const Project = require('../models/project')
const User = require('../models/user')

class Controller {
    static createProject(req, res) {
        Project.create(req.body)
        .then(newProject => {
            newProject.users.forEach(e => {
                User.findById(e)
                .then(updated => {
                    updated.projects.push(newProject._id)
                    updated.save()
                    res
                        .status(201)
                        .json({
                            msg: `Success creating a Project`,
                            project: newProject
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
            });
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

    static allProjects(req, res) {
        Project.find()
        .then(projects => {
            res
                .status(200)
                .json({
                    data: projects
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

    static findProject(req, res) {
        Project.findById(req.params.id)
        .populate('users')
        .populate('todos')
        .then(project => {
            res
                .status(200)
                .json({
                    data: project
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

    // static updateProject(req, res) {
    
    // }

    static deleteProject(req, res) {
        Project.deleteOne({
            _id: req.params.id
        })
        .then(deleted => {
            res
                .status(200)
                .json({
                    msg: `Project has successfully been deleted`
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