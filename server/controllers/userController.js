const User = require('../models/user')
const { tokenGenerator, tokenDecoder } = require('../helpers/token')
const { compare } = require('../helpers/bcrypt')

module.exports = {

  register: function(req, res) { //tested

    console.log(req.body)
    User.create({
      name : req.body.name,
      email : req.body.email,
      password : req.body.password,
      source : 'register'
    })
      .then( function(newUser) {
        res
          .status(201)
          .json({ msg: 'register successfully', data : newUser })
      })
      .catch( function(err) {
        // console.log(err)
        if(err.message.includes('email is taken')) {
          res
            .status(400)
            .json(err.message)
        } else {
          res
            .status(500)
            .json({ msg : `internal server error`})
        }
      })
  },

  login: function(req, res) { //tested
    
    User.findOne({
      email: req.body.email
    })
      .then( function(user) { 
        if(!user) {
          res
            .status(400)
            .json({ msg : `email/password is wrong`})
        } else {
          if(!compare(req.body.password, user.password)) {
            res
              .status(400)
              .json({ msg : `email/password is wrong` })
          } else {
            let token = tokenGenerator(user._id, user.name, user.email)
            res
              .status(200)
              .json({ token : token })
          }
        }
      })
      .catch( function(err) {
        console.log(err)
        res
          .status(500)
          .json({ msg : `internal server error` })
      })
  },

  update : function(req, res) { //tested

    User.findOneAndUpdate({ email : req.params.email }, { $set : req.body }, { new : true })
      .then( function(updated) {
        if(!updated) {
          res
            .status(404)
            .json({ msg : `data not found`})
        } else {
          res
            .status(200)
            .json({ msg : `data updated`, data: updated})
        }
      })
      .catch( function(err) {
        console.log(err)
        res.status(500).json({ msg : `internal server error`})
      })
  }
}