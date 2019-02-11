const mongoose = require('mongoose')
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema

const userSchema = new Schema({
  name: String,
  email: String,
  password: String
})

userSchema.pre('save', function(next) {
  let salt = bcrypt.genSaltSync(10);
  this.password = bcrypt.hashSync(this.password, salt);
  next()
})

const User = mongoose.model('User', userSchema)

module.exports = User