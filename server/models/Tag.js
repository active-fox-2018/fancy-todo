const mongoose= require('mongoose')
const Schema = mongoose.Schema

const TagSchema = Schema ({
  name: {
    type: String,
    required: [true, "Category name can't be empty"]
  },
  users: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
})

const Tag = mongoose.model('Tag', TagSchema)

module.exports = Tag