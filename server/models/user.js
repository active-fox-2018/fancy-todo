const mongoose =require('mongoose')
const Schema = mongoose.Schema
require('dotenv').config()
const { generatePass } = require('../helpers')

function checkUnique(){
    return new Promise((resolve, reject) =>{
        User.findOne({ email: this.email, _id: { $ne: this._id } })
            .then(data => {
                if(data) {
                    resolve(false)
                } else {
                    resolve(true)
                }
            })
            .catch(err => {
                reject(false)
            })
    })
}

const userSchema = new Schema({
    email : {
        type : String,
        required: [true, 'Email must be filled'],
        match: [/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, `Please fill valid email address`],
        validate: [checkUnique, 'Email already taken']
    },
    name : {
        type : String
    },
    password : {
        type : String
    }

})

userSchema.pre('save', function (next) {
    if (this.password) {
        this.password = generatePass(this.password)
    }
    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User