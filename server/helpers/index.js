const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
var salt = bcrypt.genSaltSync(10)

module.exports = {
    generatePass(input) {
        return bcrypt.hashSync(input, salt)
    },
    comparePass (input, pass) {
        return bcrypt.compareSync(input, pass)
    },
    verifyJwt (token) {
        return jwt.verify(token, process.env.JWT)
    }
}