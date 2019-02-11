const mongoose = require('mongoose')
const Schema = mongoose.Schema

const todoSchema = new Schema({
  name : String,
  description: String,
  status : String,
  createdAt: {
    type : Date,
    default : new Date
  },
  due_date: Date,
  creator : { type: Schema.Types.ObjectId, ref: 'User' }
})

todoSchema.pre('remove', function(todo) {
  
})

const Todo = mongoose.model('Todo', todoSchema)

module.exports = Todo