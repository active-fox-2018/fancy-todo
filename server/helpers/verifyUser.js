const jwt = require('jsonwebtoken')
require('dotenv').config()

function decode(token) {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded
}

module.exports = decode