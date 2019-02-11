const { hashPass } = require('../helpers')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema ({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        validate: [{
            validator: function(v) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
            },
            message: "invalid email format"
        }, {
            isAsync: true,
            validator: function(v, cb) {
                User
                    .findOne({email: v, _id: {$ne: this._id}})
                    .then(user => {
                        user? cb(false): cb(true)
                    })
                    .catch(err => {
                        cb(false)
                    })
            },
            message: "email already used"
        }]
    },
    password: {
        type: String,
        required: true
    }
})

userSchema.pre('save', function(next) {
    this.password = hashPass(this.password)
    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User