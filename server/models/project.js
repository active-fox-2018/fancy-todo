const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema({
    users: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    name: {
        type: String,
        required: true
    },
    todos: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Todo'
        }
    ]
})

const Project = mongoose.model('Project', projectSchema)

module.exports = Project