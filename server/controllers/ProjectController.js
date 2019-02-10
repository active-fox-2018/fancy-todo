const Project = require('../models/Project')

class ProjectController {

  static create(req, res) {
    Project
      .create({
        name: req.body.name,
        description: req.body.description,
        due_date: req.body.due_date,
        users: req.user._id
      })
      .then(project => {
        res
          .json({
            msg: "create data success",
            data: project
          })
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

    Project
      .find(query)
      .populate("users")
      .then(projects => {
        if (!projects.length) {
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
              data: projects
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
    Project
      .findById(req.params.id)
      .then(project => {
        if (!project) {
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
              data: project
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

    Project
      .findOneAndUpdate({ _id: req.params.id }, body, { new: true })
      .then(project => {
        if (!project) {
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
              data: project
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
    Project
      .findOneAndDelete({ _id: req.params.id })
      .then(project => {
        if (!project) {
          res
            .status(404)
            .json({
              msg: "not found"
            })
        } else {
          res
            .status(200)
            .json({
              msg: "delete success",
              data: project
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

module.exports = ProjectController