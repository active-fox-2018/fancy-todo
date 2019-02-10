const mongoose = require('mongoose')
const Schema = mongoose.Schema

const todoSchema = new Schema({
   
    name : {
        type: String,
        required: true
    },
    description : {
        type: String,
        required: true
    },
    status : {
        type : String,
        default : 'uncomplete'
    },
    dueDate : {
        type: Date,
        required: true
    },
    createdAt : {
        type : Date, 
        default : Date.now
    }
})

const Todo = mongoose.model('Todo', todoSchema)

module.exports = Todo