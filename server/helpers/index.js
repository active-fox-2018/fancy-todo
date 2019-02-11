const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

module.exports = {
    hashPass(pass) {
        return bcrypt.hashSync(pass, 10)
    },
    comparePass(pass, hash) {
        return bcrypt.compareSync(pass, hash)
    },
    sign(payload) {
        return jwt.sign(payload, process.env.JWT_SECRET);
    },
    verify(token) {
        return jwt.verify(token, process.env.JWT_SECRET)
    },
}