const Todo = require('../models/Todo')

function authorizedUser(req, res, next) {
  Todo
    .findById(req.params.id)
    .then(task => {
      if (String(task.user) !== String(req.currentUser._id)) {
        res.status(401).json({
          msg: 'Unauthorized User'
        })
      } else {
        next()
      }
    })
    .catch(err => {
      res.status(500).json({
        msg: 'Internal Server Error',
        Error: err
      })
    })
}

module.exports = authorizedUser