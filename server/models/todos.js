const mongoose = require('mongoose')
const Schema = mongoose.Schema

const todoSchema = new Schema ({
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'uncomplete'
    },
    due_date: {
        type: Date,
    }
})

const Todo = mongoose.model('Todo', todoSchema)

module.exports = Todo