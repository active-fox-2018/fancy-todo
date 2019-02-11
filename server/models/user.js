const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { encrypt } = require('../helpers/encrypt');

const UserSchema = new Schema({
  full_name: {
    type: String,
    required: [true, 'Please fill out this field']
  },
  email: {
    type: String,
    required: [true, 'Please fill out this field'],
    validate: {
      isAsync: true,
      validator: function (value) {
        return new Promise((resolve, reject) => {
          // console.log(this);
          User
            .findOne(
              {
                email: value,
                _id: { $ne: this._id }
              }
            )
            .then((result) => {
              if (result) {
                reject(false);
              } else {
                resolve(true);
              }
            })
            .catch((err) => {
              reject(err);
            });
        });
      },
      message: "Email already exist"
    }
  },
  password: {
    type: String,
    required: [true, 'Please fill out this field']
  },
  avatar: {
    type: String
  }
});

UserSchema.pre("save", function () {
  this.password = encrypt(this.password);
  next();
});


const User = mongoose.model("User", UserSchema);
module.exports = User;