const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { hashPW } = require('../helpers/bcrypt')

const UserSchema = new Schema({
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
            .findOne({
              email: value
            })
            .then(user => {

              if (user) {
                callback(false)
              } else {
                callback(true)
              }
            })
            .catch(err => {
              console.log(err)
            })
        },
        message: "this email is taken. please use another email"
      }
    ],
    required: [true, "email can't be empty"]
  },
  password: {
    type: String,
    minlength: [6, "password must be at least 6 character long"],
    required: [true, "passsword can't be empty"]
  },
  teamRole: {
    type: String,
    default: "member"
  },
  Todos: [{
    type: Schema.Types.ObjectId,
    ref: "Todo"
  }],
  userRole: {
    type: String,
    default: "user"
  },
  source: {
    type: String,
    required: [true, "source can't be empty"]
  }
})

UserSchema.pre('save', function (next) {
  this.password = hashPW(this)
  next()
})

UserSchema.post('save', function (user) {
  user.password = hashPW(user)
  user.save()
})

const User = mongoose.model('User', UserSchema)

module.exports = User