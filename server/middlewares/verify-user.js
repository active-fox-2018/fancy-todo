const User = require('../models/user')
const jwt = require('jsonwebtoken')

function verify(req, res, next) {
    if (!req.headers.token) {
        res.status(400).json({msg: "Please login"})
    } else {
        let decoded = jwt.verify(req.headers.token, process.env.JWT_TOKEN)
        User
            .findOne({email: decoded.email})
            .then((user) => {
                if (!user) {
                    res.status(400).json({msg: "User not found"})
                } else {
                    next()
                }
            })
            .catch((err) => {
                res.status(500).json({status: 'Internal Server Error'})
            })
    }
}

module.exports = verify