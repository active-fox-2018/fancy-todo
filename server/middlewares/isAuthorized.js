const Todo = require('../models/Todo')

function isAccountOwner(req, res, next) {
  if (req.user._id.toString() == req.params.id) {
    next()
  } else {
    res
      .status(401)
      .json({
        msg: "unauthorized access",
      })
  }
}

function isTodoOwner(req, res, next) {
  Todo
    .findById(req.params.id)
    .then(todo => {
      if (req.user._id.toString() == todo.users.toString()) {
        next()
      } else {
        res
          .status(401)
          .json({
            msg: "unauthorized access",
          })
      }
    })
}

module.exports = { isTodoOwner, isAccountOwner }