
const mongoose = require('mongoose')
const Schema = mongoose.Schema


const projectSchema = new Schema({
    name : String,
    description : String,
    admin : { type: Schema.Types.ObjectId, ref: 'User' },
    dueDate : Date,
    createdAt : {
        type : Date, 
        default : Date.now
    },
    members : [{ type: Schema.Types.ObjectId, ref: 'User' }]

})


const Project = mongoose.model('Project', projectSchema)

module.exports = Project