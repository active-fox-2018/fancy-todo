const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProjectSchema = new Schema({
  name : {
    type : String,
    minlength: [4, `name must be at least 4 character long`]
  },
  leader : { type:Schema.Types.ObjectId, ref : 'User' },
  members : [{ type: Schema.Types.ObjectId, ref: 'User' }],
  todos : [{ type: Schema.Types.ObjectId, ref: 'Todo' }]
})

const Project = mongoose.model('Project', ProjectSchema)

module.exports = Project