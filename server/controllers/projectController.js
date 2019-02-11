const Project = require('../models/project')

class ProjectController {

  static create(req, res) {
    Project.create({
      name: req.body.name,
      description : req.body.description,
      // due_date : req.body.duedate,
      users : req.body.users
    })
    .then(project => {
      res.status(500).json(project)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({msg : 'internal server error'})
    })
  }

  static update(req, res) {
    Project.findOneAndUpdate({
      id : req.body.id
    }, {
      $set : {
        name : req.body.name,
        description : req.body.description,
        due_date : req.body.due_date,
        members : req.body.members
      }
    }, {
      new : true
    })
    .then(project => {
      res.status(500).json(project)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({msg : 'internal server error'})
    })
  }

  static patch(req, res) {
    Project.findOneAndUpdate({
      id : req.body.id
    }, req.body , {
      new : true
    })
    .then(project => {
      res.status(500).json(project)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({msg : 'internal server error'})
    })
  }

  static delete(req, res) {
    Project.findOneAndDelete
  }
}

module.exports = ProjectController