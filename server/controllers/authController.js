const User = require('../models/user')
const { tokenGenerator, tokenDecoder } = require('../helpers/token')
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);

module.exports = {

  loginGoogle: function(req,res) { // tested
    let dataPayload = undefined;
    client.verifyIdToken({
      idToken : req.body.token,
      audience : process.env.CLIENT_ID
    })
      .then( function(ticket) {
        const payload = ticket.getPayload();
        dataPayload = payload;
        return User.findOne({
          email : payload.email
        })
      })
      .then( function(data) {
        // console.log(data)
        if(!data) {
          let kamus = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
          let randomPass = ''
          while(randomPass.length < 6) {
            randomPass += kamus[Math.floor(Math.random() * kamus.length)]
          }
          return User.create({
            name : dataPayload.name,
            email : dataPayload.email,
            source : 'google',
            password : randomPass
          })
          // .then( function(newUser) {
          //   // console.log('here')
          //   let token = tokenGenerator(newUser.name, newUser.email)
          //   res
          //     .status(201) 
          //     .json({token : token})    
          // })
        } else {
          return data
          // let token = tokenGenerator(data.name, data.email)
          // res
          // .status(200)
          // .json({ token : token})
        }
      })
      .then( function(user) {
        let token = tokenGenerator(user._id, user.name, user.email)
        console.log(token)
        res
          .status(200)
          .json({token: token})
      })
      .catch(err => {
        console.log(err)
        res
          .status(500)
          .json({
            msg: 'internal server error',
            err: err
        })
      })
  },

  verifyUser: function(req, res) { // belum ditestin
    try {
      let tokenDecoded = tokenDecoder(req.body.token)
      res.json(tokenDecoded)
    } catch (err) {
      console.log(err)
      res
        .status(400)
        .json({ err: err })
    }
  }
}