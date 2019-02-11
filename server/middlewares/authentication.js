const { verifyToken } = require('../helpers/jwt')
const User = require('../models/User')

function authenticateUser(req, res, next) {
  if (!req.headers.token) {
    res.status(404).json({
      msg: `Token Not Found`
    })
  } else {
    let payload = verifyToken(req.headers.token);
    User
      .findOne({
        email: payload.email
      })
      .then(found => {
        if (!found) {
          res.status(401).json({
            msg: `User Not Found`
          })
        } else {
          req.currentUser = found
          next()
        }
      })
  }
}

module.exports = authenticateUser
