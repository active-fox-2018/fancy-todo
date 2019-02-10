const mongoose = require('mongoose');
const Schema = mongoose.Schema 

const projectSchema = new Schema({
    name: {
        type: String
    },
    task: [{
        type: Schema.Types.ObjectId,
        ref: 'Task'
    }],
    member: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
}, {
    timestamps: true
})


const Project = mongoose.model('Project', projectSchema)
module.exports = Project;