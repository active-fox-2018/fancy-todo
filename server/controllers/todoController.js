const Todo = require('../models/todo');

module.exports = {
  createTask: (req, res) => {
    Todo
      .create({
        title: req.body.title,
        description: req.body.description,
        due_date: req.body.due_date
      })
      .then((task) => {
        res.status(201).json({ task, message: 'Successfully Create Task' });
      })
      .catch(() => {
        res.status(404).json({ message: 'Please fill out this field' });
      })
  },
  readTask: (req, res) => {
    Todo
      .find({})
      .then(todos => {
        res.status(200).json({ todos });
      })
      .catch(err => {
        res.status(500).json({ message: err.errors.title.message });
      })
  },
  updateTask: (req, res) => {
    // console.log(req.body);
    Todo
      .findOneAndUpdate(
        { _id: req.body._id },
        {
          title: req.body.title,
          description: req.body.description,
          due_date: req.body.due_date
        }, { new: true }
      )
      .then(task => {
        res.status(201).json({ task, message: 'Successfully Update Task' });
      })
      .catch(err => {
        res.status(500).json({ message: err.errors });
      })
  },
  deleteTask: (req, res) => {
    Todo
      .findByIdAndDelete({ _id: req.body._id })
      .then((task) => {
        res.status(201).json({ task, message: 'Successfully Delete Task' });
      })
      .catch((err) => {
        res.status(500).json({ message: err.errors });
      });
  }
}