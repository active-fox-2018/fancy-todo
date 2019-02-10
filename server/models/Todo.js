const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TodoSchema = Schema({
  name: {
    type: String,
    required: [true, "name can't be empty"]
  },
  description: String,
  status: String,
  due_date: Date,
  users: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  createdAt: {
    type: Date,
    default: new Date
  },
  project: {
    type: Schema.Types.ObjectId,
    ref: "Project"
  },
  tag: {
    type: Schema.Types.ObjectId,
    ref: "Tag"
  }
})

const Todo = mongoose.model('Todo', TodoSchema)

module.exports = Todo