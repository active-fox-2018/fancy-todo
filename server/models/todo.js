const mongoose = require('mongoose')
const Schema = mongoose.Schema

const todoSchema = new Schema({
   
    name : String,
    description : String,
    status : {
        type : String, 
        default : 'uncomplete'
    },
    dueDate : Date,
    createdAt : {
        type : Date, 
        default : Date.now
    }
})

const Todo = mongoose.model('Todo', todoSchema)

module.exports = Todo