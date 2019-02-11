const Todo = require('../models/todo')
function authorization(req, res, next) {
  Todo.findOne({
    _id : req.body.id,
    users : req.body.user,
  })
  .then(data => {
    console.log(data)
    if(data == null) {
      throw '404'
    } else {
      next()
    }
  })
  .catch(err => {
    console.log(err)
    if(err == '404') {
      res.status(404).json({msg : 'unauthorize'})
    } else {
      res.status(500).json({msg : 'internal server error'})
    }
  })
}

module.exports = authorization