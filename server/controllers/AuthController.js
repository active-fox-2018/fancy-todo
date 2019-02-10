require('dotenv').config()
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const { jwtSign, jwtVerify } = require('../helpers/jwt')
const User = require('../models/User')
const { comparePW } = require('../helpers/bcrypt')

class AuthController {
  static googleAuth(req, res) {
    var payload = null

    client
      .verifyIdToken({
        idToken: req.body.idToken,
        audience: process.env.GOOGLE_CLIENT_ID
      })
      .then(ticket => {
        payload = ticket.getPayload()
        return User
          .findOne({ email: payload.email })
      })
      .then(user => {
        if (!user) {
          User
            .create({
              email: payload.email,
              password: process.env.GOOGLE_OAUTH_PASSWORD,
              source: 'google'
            })
            .then(newUser => {
              res
                .status(201)
                .json({
                  msg: "create success",
                  data: newUser,
                  token: jwtSign(payload)
                })
            })
        } else {
          res
            .status(200)
            .json({
              msg: "sign in success",
              token: jwtSign(payload)
            })
        }
      })
      .catch(err => {
        console.log(err)
        res
          .status(500)
          .json({
            msg: "internal server error",
            err
          })
      })
  }

  static register(req, res) {
    User
      .create({
        email: req.body.email,
        password: req.body.password,
        source: 'manual'
      })
      .then(newUser => {
        var payload = {
          userRole: newUser.userRole,
          email: newUser.email,
          _id: newUser._id
        }

        res
          .status(201)
          .json({
            msg: "create success",
            data: newUser,
            token: jwtSign(payload)
          })
      })
      .catch(err => {
        console.log(err)
        if (err._message = "user validation failed") {
          res
            .status(400)
            .json({
              msg: "bad request (validation failed)",
              err
            })
        } else {
          res
            .status(500)
            .json({
              msg: "internal server error",
              err
            })
        }
      })
  }

  static login(req, res) {
    User
      .findOne({
        email: req.body.email
      })
      .then(user => {
        if (!user) {
          res
            .status(404)
            .json({
              msg: "you have to signup first"
            })
        }
        else if (user.source !== 'manual') {
          res
            .status(400)
            .json({
              msg: `please sign in with ${user.source}`
            })
        } else {
          if (comparePW(req.body.password, user.password)) {
            var payload = {
              userRole: user.userRole,
              email: user.email,
              _id: user._id
            }

            res
              .status(200)
              .json({
                msg: "signin success",
                token: jwtSign(payload)
              })
          } else {
            res
              .status(404)
              .json({
                msg: "incorrect email/password"
              })
          }
        }
      })
  }
}

module.exports = AuthController

