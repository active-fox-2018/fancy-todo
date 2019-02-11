const mongoose = require('mongoose')

const Schema = mongoose.Schema;
const todoSchema = new Schema({
  name: String,
  description: String,
  status: Boolean,
  due_date: Date
})

const Todo = mongoose.model('Todo', todoSchema)

module.exports = Todo;