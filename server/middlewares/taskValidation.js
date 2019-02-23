const Task = require('../models/Task')
const ObjectId = require('mongoose').Types.ObjectId

function taskValidation(req, res, next) {
    Task
        .findOne({userId: ObjectId(req.current_user._id)})
        .then(task => {
            if(task) {
                next()
            } else {
                res.status(400).json({msg: 'Not Authorize'})
            }
        })
        .catch(err => {
            res.status(500).json(err)
        })
}

module.exports = taskValidation