const User = require('../models/User')

class UserController {

  static create(req, res) {
    User
      .create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        source: "manual"
      })
      .then(user => {
        res
          .json({
            msg: "create data success",
            data: user
          })
      })
      .catch(err => {
        res
          .status(500)
          .json({
            msg: "internal server error",
            error: err
          })
      })
  }

  static findAll(req, res) {
    var query = {}

    if (req.query.q) {
      query = {
        username: {
          $regex: '.*' + req.query.q + '.*',
          $options: "i"
        }
      }
    }

    User
      .find(query)
      .then(users => {
        if (!users.length) {
          res
            .status(404)
            .json({
              msg: "not found"
            })
        } else {
          res
            .status(200)
            .json({
              msg: "fetch data success",
              data: users
            })
        }
      })
      .catch(err => {
        res
          .status(500)
          .err({
            msg: "interall server error",
            error: err
          })
      })
  }

  static findOne(req, res) {
    User
      .findById(req.params.id)
      .then(user => {
        if (!user) {
          res
            .status(404)
            .json({
              msg: "not found"
            })
        } else {
          res
            .status(200)
            .json({
              msg: "fetch success",
              data: user
            })
        }
      })
      .catch(err => {
        res
          .status(500)
          .json({
            msg: "internal srver error",
            err
          })
      })
  }

  static update(req, res, next) {

    var allowedKeys = ['username', 'email', 'password']
    var body = {}
    var accessDenied = false

    for (var key in req.body) {
      if (allowedKeys.includes(key)) {
        body[key] = req.body[key]
      } else {
        accessDenied = true
      }
    }

    if (accessDenied) {
      res
        .status(401)
        .json({
          msg: "you're unauthorized to update some keys"
        })
    } else {

      User
        .findOneAndUpdate({ _id: req.params.id }, body, { new: true })
        .then(user => {
          if (!user) {
            res
              .status(404)
              .json({
                msg: "not found"
              })
          } else {
            res
              .status(200)
              .json({
                msg: "update success",
                data: user
              })
          }
        })
        .catch(err => {
          res
            .status(500)
            .json({
              msg: "internal server error",
              error: err
            })
        })
    }

  }

  static delete(req, res, next) {
    User
      .findOneAndDelete({ _id: req.params.id })
      .then(user => {
        if (!user) {
          res
            .status(404)
            .json({
              msg: "not found"
            })
        } else {
          res
            .status(200)
            .json({
              msg: "delete success",
              data: user
            })
        }
      })
      .catch(err => {
        res
          .status(404)
          .err({
            msg: "Not Found",
            error: err
          })
      })
  }

}

module.exports = UserController