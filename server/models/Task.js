const mongoose = require('mongoose')
const Schema = mongoose.Schema

var taskSchema = new Schema({
    title: {
        type: String,
        required: [true, `task title must be filled`]
    },
    description: {
        type: String,
        required: [true, `Please fill task description`]
    },
    status: {
        type: Boolean,
        default: false
    },
    deadline: {
        type: Date
    },
    user: { 
        type: Schema.Types.ObjectId, 
        ref: 'User' 
    },
    project: {
        type: Schema.Types.ObjectId,
        ref: 'Project'
    }
}, {
    timestamps: true
})
const Task = mongoose.model('Task', taskSchema)
module.exports = Task