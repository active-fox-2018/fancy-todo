const User = require('../models/User')
const compare = require('../helpers/compare')
const { generateToken } = require('../helpers/jwt')

module.exports = {

  register: (req, res) => {
    let input = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    }
    User
      .create(input)
      .then(user => {
        res.status(201).json({
          msg: 'New User has been created, now you can login',
          New_User: user,
        })
      })
      .catch(err => {
        res.status(500).json({
          msg: 'Internal Server Error',
          Error: err
        })
      })
  },

  login: (req, res) => {
    User
      .findOne(
        {
          email: req.body.email
        }
      )
      .then(user => {
        if (!user) {
          res.status(404).json({
            msg: `Sorry we couldn't find user with email '${req.body.email}' , make sure your email has been registered`
          })
        } else {
          if (compare(req.body.password, user.password)) {
            let payload = {
              id: user.id,
              name: user.name,
              email: user.email
            }
            res.status(200).json({
              token: generateToken(payload)
            })
          } else {
            res.status(400).json({
              msg: 'email/password wrong'
            })
          }
        }
      })
      .catch(err => {
        res.status(500).json({
          msg: 'Internal Server Error',
          Error: err
        })
      })
  }


}