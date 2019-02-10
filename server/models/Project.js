const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProjectSchema = Schema({
  name: {
    type: String,
    required: [true, "project name can't be empty"]
  },
  description: String,
  due_date: Date,
  createdAt: {
    type: Date, 
    default: new Date
  },
  users: [{
    type: Schema.Types.ObjectId,
    ref: "User"
  }],
  todos: [{
    type: Schema.Types.ObjectId,
    ref: "Todo"
  }]
})

const Project = mongoose.model('Project', ProjectSchema)

module.exports = Project