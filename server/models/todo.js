const mongoose = require('mongoose')
const Schema = mongoose.Schema


const todoSchema = new Schema({
  name: String,
  description : String, 
  status : {
    type : String,
    enum : ['complete', 'uncomplete']
  },
  due_date : Date,
  users : [{ type : Schema.Types.ObjectId, ref : 'User'}],
  project : [{ type : Schema.Types.ObjectId, ref : 'Project'}]
  })




const Todo = mongoose.model('Todo', todoSchema)

module.exports = Todo