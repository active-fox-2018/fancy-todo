const mongoose = require('mongoose')
const Schema = mongoose.Schema

const projectSchema = new Schema ({
    name: {
        type: String,
        required: [true, 'project todo name required']
    },
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    todos: [{ type: Schema.Types.ObjectId, ref: 'Todo' }]
})

projectSchema.pre('save', function(next) {
    this.members.push(this.userId)
    next()
})

const Project = mongoose.model('Project', projectSchema)

module.exports = Project