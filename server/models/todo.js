const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./user')

const todoSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
  })

//hook untuk tambahin todo ke user
// todoSchema.pre('save', function(next) {
//     User.findOne({
//         _id: this.user
//     })
//     .then(user => {
//         user.todos.push(this._id)
//         console.log(user)
//         user.save()
//     })
//     .catch(err => {
//         console.log(err)
//     })
//     next()
// })

const Todo = mongoose.model('Todo', todoSchema)

module.exports = Todo