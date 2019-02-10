const jwt = require('jsonwebtoken')
require('dotenv').config()
const Users = require('../models/user')

function access(req,res,next) {
    try {
        let decoded = jwt.verify(req.headers.token, process.env.JWTTOKEN)
        Users
            .findOne({ email: decoded.email })
            .then(user => {
                next()
            })
            .catch(err => {
                res.status(500).json({ message: 'internal server error', error: err })
            })

    } catch (err) {
        res.status(402).json({ message: "you're not authorize for this session" })
    }
}

module.exports = access