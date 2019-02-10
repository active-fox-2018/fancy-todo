const jwt = require('jsonwebtoken')
require('dotenv').config()
const Users = require('../models/user')

function access(req,res,next) {
    try {
        let decoded = jwt.verify(req.headers.token, process.env.JWTTOKEN)
        console.log(typeof decoded.id,"==============ini decode");
        
        Users
            .findOne({ _id: decoded.id })
            .then(user => {
                next()
            })
            .catch(err => {
                res.status(500).json({ message: 'internal server error', error: err })
            })

    } catch (err) {
        console.log(err);
        
        res.status(402).json({ message: "you're not authorize for this session" })
    }
}

module.exports = access