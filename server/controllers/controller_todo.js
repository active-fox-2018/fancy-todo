const Todo = require('../models/Todo')

module.exports = {

  all: (req, res) => {
    Todo
      .find({
        user: req.currentUser._id
      })
      .then(tasks => {
        if (!tasks.length) {
          res.status(404).json({
            msg: 'There is no task to do, please create a new one'
          })
        } else {
          res.status(200).json({
            Tasks: tasks
          })
        }
      })
      .catch(err => {
        res.status(500).json({
          msg: 'Internal Server Error',
          Error: err
        })
      })
  },

  create: (req, res) => {
    let input = {
      name: req.body.name,
      description: req.body.description,
      status: req.body.status,
      due_date: req.body.due_date,
      user: req.currentUser._id
    }

    Todo
      .create(input)
      .then(task => {
        res.status(201).json({
          msg: 'New Task has been created',
          Task: task
        })
      })
      .catch(err => {
        res.status(500).json({
          msg: 'Internal Server Error',
          Error: err
        })
      })
  },

  update: (req, res) => {
    let input = {
      name: req.body.name,
      description: req.body.description,
      status: req.body.status,
      due_date: req.body.due_date
    }

    Todo
      .findByIdAndUpdate({ _id: req.params.id }, input, { new: true })
      .then(task => {
        res.status(201).json({
          msg: 'Task has been updated',
          Task: task
        })
      })
      .catch(err => {
        res.status(500).json({
          msg: 'Internal Server Error',
          Error: err
        })
      })
  },

  delete: (req, res) => {
    Todo
      .findByIdAndDelete({ _id: req.params.id })
      .then(() => {
        res.status(200).json({
          msg: 'Task has been deleted',
        })
      })
      .catch(err => {
        res.status(500).json({
          msg: 'Internal Server Error',
          Error: err
        })
      })
  }

}