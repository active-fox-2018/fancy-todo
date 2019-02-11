const { tokenDecoder } = require('../helpers/token')
const User = require('../models/user')
const Project = require('../models/project')

module.exports = {
  isLogin: function(req, res, next) { // tested
    
    try {

      let token = req.headers.token
      if(!token) {
        res
          .status(400)
          .json({ msg : `invalid token`})
      } else {
        
        // console.log('here')
        let tokenDecoded = tokenDecoder(token)
        // console.log(tokenDecoded)
        User.findOne({ email : tokenDecoded.email })
          .then( function(user) {
            // console.log('here')
            if(!user) {
              res
                .status(400)
                .json({ msg : `error with user login`})
            } else {
              req.headers.id = user._id
              // console.log('here')
              next()
            }
          })
          .catch( function(err) {
            throw err
          })
      }
    } catch (err) {
      console.log(err)
      res
        .status(500)
        .json({ msg :`internal server error` })
    }
  },

  isAuthorizedMember : function(req, res, next) {

    Project.findById(req.params.projectId).populate('leader').populate('member')
      .then( function(project) {
        // console.log(project)
        if(!project) {
          res
            .status(400)
            .json({ msg : `invalid access` })
        } else {
          console.log(String(req.headers.id) == String(project.leader._id))
          let checkMember = project.members.findIndex( member => String(member._id) == String(req.headers.id) )
          if(checkMember != -1 || String(req.headers.id) == String(project.leader._id)) {
            // console.log('here')
            next()
          } else {
            res
              .status(400)
              .json({ msg : `access unauthorized` })
          }
        }
      })
      .catch( function(err ) {
        res
          .status(500)
          .json({ msg : `internal server error` , err : err})
      })
  }
}