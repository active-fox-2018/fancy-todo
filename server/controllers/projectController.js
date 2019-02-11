const Project = require('../models/project')
const axios = require('axios')

module.exports = { 
  create: function(req, res) { //tested
    
    Project.create({
      name: req.body.name,
      leader : req.headers.id
    })
      .then( function(newProject) {
        res
          .status(201)
          .json({ msg : `created successfully`, data : newProject })
      })
      .catch( function(err) {
        res
          .status(500)
          .json({ msg : `internal server error`, err : err })
      })
  },

  getProjectByUser: function(req, res) { //tested
    
    Project.find({ $or : [ { leader : req.headers.id }, { members : req.headers.id }]})
    // Project.find({ leader : req.params.userId })
      .then( function(projects) {
        res
          .status(200)
          .json({ data : projects})
      })
      .catch( function(err) {
        res
          .status(500)
          .json({ msg : `internal server error`, err : err })
      })
  },

  addMember : function(req, res) {

    Project.findOneAndUpdate({ _id: req.params.projectId }, { $push : { members : req.params.userId }}, { new : true })
      .then( function(updated) {
        res
          .status(200)
          .json({ msg : `added successfully`, data : updated})
      })
      .catch( function(err) {
        res
          .status(500)
          .json({ msg : `internal server error`, err: err })
      })
  },

  addTodo : function(req, res) {
    
    axios({
      method: 'POST',
      url: 'http://localhost:3000/todos', 
      data : {
        name : req.body.name,
        description: req.body.description,
        due_date: req.body.due_date,
        creator : req.headers.id
      }, 
      headers : {
        id : req.headers.id 
      }
    })
      .then( function(response) {
        console.log('herestuck')
        return Project.findByIdAndUpdate(req.params.projectId, {
          $push : { todos : response.data.data._id }
        }, { new : true })
      })
      .then( function(project) {
        res
          .status(200)
          .json({ msg : `added successfully`, data : project.todos })
      })
      .catch( function(err) {
        res
          .status(500)
          .json({ msg : `internal server error`, err: err})
      })
  },

  deleteTodo : function(req, res) { // tested

    // console.log(req.params)
    axios({
      method : 'delete',
      url : `http://localhost:3000/todos/${req.params.todoId}`,
      headers : { id : req.headers.id }
    })
      .then( function(response) {
        return Project.findByIdAndUpdate(req.params.projectId, {
          $pull : { todos : response.data.data._id }
        }, { new : true })
      })
      .then( function(project) {
        res
          .status(200)
          .json({ msg : `deleted successfully`, data : project.todos })
      })
      .catch( function(err) {
        res
          .status(500)
          .json({ msg : `internal server error`, err : err })
      })
  }
}