const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    full_name: {
        type: String,
        required: true,
        minlength: [3, 'We found that your name doesn\'t look right']
    },
    email: {
        type: String,
        required: true,
        validate : [{
            validator : function(v) {
              return /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v)
            },
            message : "invalid email format"
          },{
            isAsync : true,
            validator : (value, callback) => {
              User
                .findOne({
                  email: value
                })
                .then(member => {
                  if (member) {
                    callback(false)
                  } else {
                    callback(true)
                  }
                })
                .catch(err => {
                  console.log('email error: ', err)
                })
            },
            message: "this email is already used"
          }],
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: [6, 'You need more security! Min password length is 6 characters']
    }
});

userSchema.pre('save', function(next) {
  const hash = bcrypt.hashSync(this.password, 15);
  this.password = hash
  next()
})

const User = mongoose.model('User', userSchema);

module.exports = User