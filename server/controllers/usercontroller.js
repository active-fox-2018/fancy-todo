const User = require('../models/user')
const compareHash= require('../helpers/compareHash')
// const goog
const jwt = require('jsonwebtoken')

class UserController { 

  static create(req, res) {
    User.create({
      name : req.body.name,
      email : req.body.email,
      password : req.body.password,
      register_type : 'manual'
    })
    .then(user => {
      res.status(201).json(user)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({error : 'internal server error'})
    })
  }

  static loginManual(req, res) {
    let userFound = null
    User.findOne({
      email : req.body.email
    })
    .then(user => {
      if(!user) {
        throw '404'
      } else {
        userFound = user
        return compareHash(req.body.password, userFound.password)
      }
    })
    .then(verifyHash => {
      console.log(verifyHash)
      if(verifyHash) {
        const token = jwt.sign( {
          email : userFound.email
        }, process.env.SECRET_JWT, {expiresIn : '1h'})
        res.status(200).json({id : userFound._id, token : token, name:userFound.name})
      } else {
        throw '401'
      }
    })
    .catch(err => {
      console.log(err)
      if(err == '404') {
        res.status(404).json({msg : 'User Not Found'})
      } else if(err == '401') {
        res.status(401).json({msg : 'Unauthorized'})
      } else {
        res.status(500).json({msg : 'internal server error'})
      }
    })
  }

  static loginByGoogle(req, res){
    const {OAuth2Client} = require('google-auth-library')
    const CLIENT_ID = "1061187022160-pvscbjvom1vrfjadl355hcv5hjf19kb3.apps.googleusercontent.com"
    const client = new OAuth2Client(CLIENT_ID)
    let user = null
    client.verifyIdToken({
      idToken : req.body.token,
      audience : CLIENT_ID
    })
    .then(ticket => {
      user = ticket.getPayload()
      return User.findOne({
        email : user.email
      })
  
    })
    .then(findUser => {
      if(findUser == null) {
        return User.create({
          email : user.email,
          name : user.given_name + " " + user.family_name,
          password : 'undefined',
          register_type : 'auto'
        })
        .then(user => {
          const token = jwt.sign( {
            email : user.email
          }, process.env.SECRET_JWT, {expiresIn : '1h'})
          res.status(200).json({id : user._id, token : token, name: user.name})
        })
      } else {
        user = findUser
        const token = jwt.sign( {
          email : user.email
        }, process.env.SECRET_JWT, {expiresIn : '1h'})
        res.status(200).json({id : user._id, token : token, name : user.name})
      }
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({err : err.message})
    })
  }


}

module.exports = UserController