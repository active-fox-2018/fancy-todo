const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId

const TaskSchema = new Schema({
    name: {
        type: String,
        required: 'Name is required'
    },
    description: String,
    status: {
        type: String,
        default: 'incomplete'
    },
    dueDate: Date,
    assignTo: {type: ObjectId, ref: 'User'},
    listId: {type: ObjectId, ref: 'List'}
}) 

const Task = mongoose.model('Task', TaskSchema)

module.exports = Task