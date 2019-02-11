const ProjectTask = require('../models/ProjectTask')
const ObjectId = require('mongoose').Types.ObjectId

const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');


module.exports = {
    createProjectTask: (req, res) => {
        let newProjectTask = { projectId, title, description, dueDate } = req.body

        ProjectTask
            .create(newProjectTask)
            .then(projectTask => {
                res.status(201).json(projectTask)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    },
    findAllProjectTask: (req, res) => {
        ProjectTask
            .find({projectId: ObjectId(req.headers.projectid)})
            .then(projectTasks => {
                res.status(200).json(projectTasks)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    },
    findOneProjectTask: (req, res) => {
        ProjectTask
            .findById(req.params.id)
            .then(projectTask => {
                res.status(200).json(projectTask)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    },
    updateProjectTask: (req, res) => {
        let updatedData = { title, description, dueDate, status } = req.body
        for(let key in updatedData) {
            if(!updatedData[key]) delete updatedData[key]
        }
        ProjectTask
            .findByIdAndUpdate(req.params.id, {$set: updatedData}, {new: true})
            .then(projectTask => {
                res.status(200).json(projectTask)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    },
    deleteProjectTask: (req, res) => {
        ProjectTask
            .findByIdAndDelete(req.params.id)
            .then(deleted => {
                res.status(200).json(deleted)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    },
}