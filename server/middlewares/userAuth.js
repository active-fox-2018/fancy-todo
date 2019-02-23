const verifyToken = require('../helpers/verifyToken')
const User = require('../models/User')

function userAuth(req, res, next) {
    const email = verifyToken(req, res).email
    User.findOne({email: email})
        .then(user => {
            if(user) {
                req.current_user = user
                next()
            } else {
                res.status(401).json({
                    msg: 'not authorize',
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                msg: 'internal server error',
                error: err
            })
        }) 
}

module.exports = userAuth