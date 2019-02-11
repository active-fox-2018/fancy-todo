const mongoose = require('mongoose')
const Schema = mongoose.Schema


const projectSchema = new Schema({
  name: String,
  description : String,
  due_date : Date,
  users : [{ type : Schema.Types.ObjectId, ref : 'User'}]
  })

const Project = mongoose.model('Project', projectSchema)

module.exports = Project