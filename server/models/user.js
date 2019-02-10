const mongoose = require('mongoose');
const Schema = mongoose.Schema 
const { genPass } = require('../helpers')

function CheckUnique() {
    return new Promise((res, rej) =>{
        User.findOne({ email: this.email, _id: { $ne: this._id } })
            .then(data => {
                if(data) {
                    res(false)
                } else {
                    res(true)
                }
            })
            .catch(err => {
                res(false)
            })
    })
}

const userSchema = new Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        required: [true, 'Email must be filled'],
        match: [/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, `Please fill valid email address`],
        validate: [CheckUnique, 'Email already taken']
    }, 
    password: {
        required: [true, `Password required`],
        type: String
    },
    image: {
        type: String
    }
})

userSchema.pre('save', function (next) {
    if (this.password) {
        this.password = genPass(this.password)
    }
    next()
})

const User = mongoose.model('User', userSchema)
module.exports = User;