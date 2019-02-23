const mongoose = require('mongoose')
const Schema = mongoose.Schema

const projectSchema = new Schema({
    ownerId: {type: Schema.Types.ObjectId, ref: 'User'},
    ownerName: String,
    name: String,
    members: [{type: Schema.Types.ObjectId, ref: 'User'}],
}, {timestamps: true})

const Project = mongoose.model('Project', projectSchema)

module.exports = Project