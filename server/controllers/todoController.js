const Todo = require('../models/todo')
const User = require('../models/user')

module.exports = {

  getTodos : function(req, res) { // tested
    // console.log(req.headers)
    User.findById({ _id : req.headers.id })
      .populate('todos')
      .then( function(user) {
        res
          .status(200)
          .json({ data: user.todos })
      })
      .catch( function(err) {
        res.status(500).json({ msg : `internal server error`, err : err })
      })
  },
  
  create: function(req, res) { //tested

    let newTodo = null
    Todo.create({
      name : req.body.name,
      description: req.body.description,
      due_date: req.body.due_date,
      status: 'uncomplete',
      creator : req.headers.id
    })
      .then( function(newData) {
        newTodo = newData
        return newData.populate('creator').execPopulate()
      })
      .then( function(todo) {
        return todo.creator.update({ $push : { todos : todo._id }})
      })
      .then( function(data) {
        // console.log(newTodo,'11111111111111111111111')
        res.status(201).json({ msg : `created successfully`, data : newTodo })
      })
      .catch( function(err) {
        res
          .status(500)
          .json({ msg : `server error`, err : err })
      })
  },

  update: function(req, res) { //tested

    Todo.findOneAndUpdate({ _id : req.params.todoId },  { $set : req.body }, { new : true })
      .then( function(updated) {
        if(!updated) {
          res.status(404).json({ msg : `todo not found`})
        } else {
          res
            .status(200)
            .json({ msg: "updated successfully", data : updated })
        }
      })
      .catch( function(err) {
        console.log(err)
        res
          .status(500)
          .json({ msg : `internal server error `})
      })
  },

  delete: function(req, res) { // tested

    // console.log('masuk sini sih')
    Todo.findOne({ _id : req.params.todoId }).populate('creator')
      .then( function(todo) {
        // console.log(todo)
        if(req.headers.id != todo.creator._id) {
          return null
        } else {
          return todo.creator.updateOne( { $pull : { todos : req.params.todoId } })
        }
      })
      .then( function(todo) {
        if(!todo) {
          res.status(400).json({ msg : `Unauthorized access`})
        } else {
           return Todo.findOneAndDelete({ _id: req.params.todoId })
             .then( function(deleted) {
               res.status(200).json({ msg : `deleted successfully`, data : deleted })
             })
        }
      })
      .catch( function(err) {
        console.log(err)
        res
          .status(500)
          .json({ msg : `internal server error`, err : err })
      })
  },

  readOne: function(req, res) { // tested
    
    Todo.findById({ _id : req.params.todoId })
      .then( function(todo) {
        if(!todo) {
          res.status(404).json({ msg : `todo not found`})
        } else {
          res.status(200).json({ msg : `todo found`, data : todo })
        }
      })
      .catch( function(err) {
        console.log(err)
        res
          .status(500)
          .json({ msg : `internal server error `})
      })
  }
}