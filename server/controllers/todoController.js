const Todo = require('../models/todo')

class TodoController { 

  static create(req, res) {
    Todo.create({
      name: req.body.name,
      description : req.body.description, 
      status : 'uncomplete',
      due_date : req.body.due_date,
      users : req.body.id
    })
    .then(todo => {
      res.status(201).json(todo)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({error : 'internal server error'})
    })
  }

  static findAll(req, res) {
  Todo.find({
    users : req.params.id
  }).sort({due_date : 'asc'})
  .then(data => {
    res.status(200).json({data, verification : true})
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({error : 'internal server error'})
  })
  }

  static update(req, res) {
    Todo.findOneAndUpdate( {
      _id : req.body.id
    },{ $set : {
      name: req.body.name,
      description : req.body.description, 
      status : req.body.status,
      due_date : req.body.due_date,
      users : req.body.user
    }}, {
      new : true
    })
    .then((data) => {
      if(data != null) {
      res.status(200).json(data)
      } else {
        throw '404'
      }
    })
    .catch(err => {
      if(err == '404') {
        res.status().json({error : 'User Not Found'})
      } else {
        res.status(500).json({error : 'internal server error'})
      }
      console.log(err)
    })
  }

  static updatePatch(req, res) {
    Todo.findOneAndUpdate( {
      _id : req.body.id
    },{ $set : 
      req.body
    }, {
      new : true
    })
    .then((data) => {
      if(data != null) {
      res.status(200).json(data)
      } else {
        throw '404'
      }
    })
    .catch(err => {
      if(err == '404') {
        res.status().json({error : 'User Not Found'})
      } else {
        res.status(500).json({error : 'internal server error'})
      }
      console.log(err)
    })
  }

  static delete(req, res) {
    Todo.findOneAndDelete({
      _id : req.body.id
    })
    .then(data => {
      res.status(200).json(data)
    })
    .catch(err => {
      res.status(500).json({error : 'internal server error'})
      console.log(err)
    })
  }
}



module.exports = TodoController