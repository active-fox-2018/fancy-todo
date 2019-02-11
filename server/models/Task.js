const mongoose = require('mongoose')
const Schema = mongoose.Schema

const taskSchema = new Schema({
    userId : {type: Schema.Types.ObjectId, ref: 'User'},
    title: String,
    description: String,
    dueDate: Date,
    status: {
        type: String,
        default: 'incoming'
    }
}, {timestamps: true})

const Task = mongoose.model('Task', taskSchema)

module.exports = Task