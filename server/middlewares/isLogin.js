const { jwtVerify } = require('../helpers/jwt')
const User = require('../models/User')

function islogin(req, res, next) {
  try {
    if (!req.headers.token) {
      console.log("you have to login first")
      res
        .status(400)
        .json({
          msg: "you have to login first"
        })
    } else {
      var decoded = jwtVerify(req.headers.token)
      User
        .findOne({
          email: decoded.email
        })
        .then(user => {
          if (!user) {
            console.log("email/password not found")
            res
              .status(404)
              .json({
                msg: "email/password not found"
              })
          } else {
            req.user = user
            next()
          }
        })
    }

  } catch (error) {
    res
      .status(500)
      .json({
        msg: "internal server error on middleware",
        error
      })
  }
}

module.exports = islogin
