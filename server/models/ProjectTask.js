const mongoose = require('mongoose')
const Schema = mongoose.Schema

const projectTaskSchema = new Schema({
    projectId : {type: Schema.Types.ObjectId, ref: 'User'},
    title: String,
    description: String,
    dueDate: Date,
    status: {
        type: String,
        default: 'incoming'
    }
}, {timestamps: true})

const ProjectTask = mongoose.model('ProjectTask', projectTaskSchema)

module.exports = ProjectTask