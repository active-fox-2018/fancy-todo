const jwt = require('jsonwebtoken')
require('dotenv').config()
const Project = require('../models/project')


function isAdmin(req,res,next) {
    try {
        console.log( typeof req.params.id,"==========didalama admin===");
        
        // let decoded = jwt.verify(req.headers.token, process.env.JWTTOKEN)
        Project
            .findOne({ _id : String(req.params.id) })
            .then(project => {
                console.log(project,"=========ini da asuk=========");
                console.log(req.body._id);
                
                
                if(project.admin == req.body._id) {
                    next()
                } else {
                    res.status(402).json({message : 'not authorize'})
                }
            })
            .catch(err => {
                console.log(err,"emroor di dalam");
                
                res.status(500).json({ message: 'internal server error', error: err })
            })

    } catch (err) {
        console.log(err,"===========di admin=====");
        
        res.status(402).json({ message: "you're not authorize for this session" })
    }
}

module.exports = isAdmin