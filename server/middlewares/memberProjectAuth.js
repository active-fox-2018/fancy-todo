const Project = require('../models/Project')
const ObjectId = require('mongoose').Types.ObjectId

function memberProjectAuth(req, res, next) {
    Project
        .findOne({members: ObjectId(req.current_user._id)})
        .then(found => {
            if(found) {
                next()
            } else {
                res.status(401).json({ 
                    msg: 'You are not in project'
                 })
            }
        })
        .catch(err => {
            res.status(500).json(err)
        })
}

module.exports = memberProjectAuth