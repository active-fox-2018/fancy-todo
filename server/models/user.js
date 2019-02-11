const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { hashGenerator } = require('../helpers/bcrypt')

const UserSchema = new Schema({
  name: {
    type: String,
    minlength: [4, "name must be at least 4 character long"]
  },
  email: {
    
    type: String,
    validate: [
      {
        validator: function (value) {
          return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(value)
        },
        msg: "invalid email format"
      },
      {
        isAsync: true,
        validator: (value, callback) => {
          User
          .findOne({ email : value })
            .then( (user) => {
              if(user && user.id != this.id) {
                callback(false)
              } else {
                callback(true)
              }
            })
            .catch( (err) => {
              throw err
            })
        },
        message: "this email is taken. please use another email."
      }
    ]
  },
  password: {
    type: String,
    minlength: [6, "password must be at least 6 character long"]
  },
  source: {
    type: String
  },
  todos: [{ type: Schema.Types.ObjectId, ref: 'Todo' }]
})

UserSchema.pre('save', function(next) {
  this.password = hashGenerator(this.password)
  next()
})

UserSchema.post('save', function(user) {
  user.password = hashGenerator(user.password)
})

const User = mongoose.model('User', UserSchema)

module.exports = User
