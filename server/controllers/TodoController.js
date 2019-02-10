const Todo = require('../models/Todo')
const Project = require('../models/Project')

class TodoController {

  static create(req, res) {
    Todo
      .create({
        name: req.body.name,
        description: req.body.description,
        due_date: req.body.due_date,
        users: req.user._id,
        project: req.body.project
      })
      .then(todo => {
        if (req.body.project) {
          return Project
            .findById(req.body.project)
            .then(project => {
              project.todos.push(todo._id)
              return project.save()
            })
            .then(updatedProject => {
              res
                .json({
                  msg: "create data success",
                  todo,
                  updatedProject
                })
            })
        } else {
          res
            .json({
              msg: "create data success",
              data: todo
            })
        }
      })
      .catch(err => {
        res
          .status(500)
          .json({
            msg: "internal server error on controller",
            error: err
          })
      })
  }

  static findAll(req, res) {
    var query = { users: req.user._id }

    if (req.query.name) {
      query = {
        $and: [{ users: req.user._id }, {
          name: {
            $regex: '.*' + req.query.name + '.*',
            $options: "i"
          }
        }]
      }
    }

    Todo
      .find(query)
      .populate("users")
      .populate("project")
      .then(todos => {
        if (!todos.length) {
          res
            .status(404)
            .json({
              msg: "not found"
            })
        } else {
          res
            .status(200)
            .json({
              msg: "fetch data success",
              data: todos
            })
        }
      })
      .catch(err => {
        res
          .status(500)
          .err({
            msg: "interall server error",
            error: err
          })
      })
  }

  static findOne(req, res) {
    Todo
      .findById(req.params.id)
      .then(todo => {
        if (!todo) {
          res
            .status(404)
            .json({
              msg: "not found"
            })
        } else {
          res
            .status(200)
            .json({
              msg: "fetch success",
              data: todo
            })
        }
      })
      .catch(err => {
        res
          .status(500)
          .json({
            msg: "internal srver error",
            err
          })
      })
  }

  static update(req, res, next) {
    Todo
      .findOneAndUpdate({ _id: req.params.id }, {
        name: req.body.name,
        description: req.body.description,
        due_date: req.body.due_date
      }, { new: true })
      .then(todo => {
        if (!todo) {
          res
            .status(404)
            .json({
              msg: "not found"
            })
        } else {
          res
            .status(200)
            .json({
              msg: "update success",
              data: todo
            })
        }
      })
      .catch(err => {
        res
          .status(500)
          .json({
            msg: "internal server error",
            error: err
          })
      })
  }

  static delete(req, res, next) {
    Todo
      .findOneAndDelete({ _id: req.params.id })
      .then(todo => {
        if (!todo) {
          res
            .status(404)
            .json({
              msg: "not found"
            })
        } else {
          if(todo.project){
            return Project
              .findById(todo.project)
              .then()
          }
          res
            .status(200)
            .json({
              msg: "delete success",
              data: todo
            })
        }
      })
      .catch(err => {
        res
          .status(404)
          .err({
            msg: "Not Found",
            error: err
          })
      })
  }

}

module.exports = TodoController