const Todo = require('../models/todo');

class TodoController {

  static create(req, res) {
    Todo 
      .create(req.body)
      .then(data => {
        res.status(201).json(data)
      })
      .catch(err => {
        res.status(500).json({err: err.message})
      })
  }

  static findAll(req, res) {
    Todo
      .find({})
      .then(allTodo => {
        res.json(allTodo);
      })
      .catch(err => {
        res.status(500).json({err: err.message})
      })
  }

  static update(req,res) {
    Todo
      .findOneAndUpdate(
        {_id: req.params.id},
        req.body
      )
      .then(data => {
        res.json(data);
      })
      .catch(err => {
        res.status(500).json({err: err.message})
      })
  }

  static delete(req, res) {
    console.log(req.params.id)
    Todo
      .findByIdAndRemove(req.params.id)
      .then(data => {
        console.log(data);
        res.json(data);
      })
      .catch(err => {
        res.status(500).json({err: err.message})
      })
  }

}

module.exports = TodoController