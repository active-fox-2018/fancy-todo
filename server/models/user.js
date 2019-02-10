const mongoose = require('mongoose')
const bcrypt = require('../helpers/getBcrypt')
const Schema = mongoose.Schema


const userSchema = new Schema({
  name : {
    type : String
  },
  email : {
    type : String,
    trim : true,
    lowercase : true,
    required: 'must filled',
    unique : true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'email format : email@mail.com']
  },
  password : {
    required : [true, 'must filled'],
    type : String,
    minlength : [5, 'password : minimal 5 characters'],
    maxlength : [20, 'password : maximal 20 characters']
  },
  register_type : {
    type :  String,
    enum : ['manual', 'auto']
  }
})


userSchema.post('validate', function(result) {
  if(result.register_type == 'auto') {
    return User.updateOne({ _id: result._id }, { $set: { password: null } })
  } else {
    bcrypt(result.password)
    .then(data => {
      return User.updateOne({ _id: result._id }, { $set: { password: data } })
    })
    .catch(err => {
      throw new Error(err)
    })
  }
})

const User = mongoose.model('User', userSchema)

module.exports = User