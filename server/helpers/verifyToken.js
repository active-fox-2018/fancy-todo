const jwt = require('jsonwebtoken')

function verifyToken(req, res) {
    if(!req.headers.token) {
        res.status(401).json({
            msg: 'Not authorize',
        })
    } else {
        const decoded = jwt.verify(req.headers.token, process.env.JWT_SECRET)
        return decoded
    }
}

module.exports = verifyToken