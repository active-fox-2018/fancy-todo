const { hashPw } = require('../helpers/hashPw') 

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        validate: {
            validator: function(email) {
                return User.findOne({email : email, _id: {$ne: this._id}})
                    .then(user => {
                        if(user) throw 'Email has been used'
                    })
                    .catch(err => {
                        throw err
                    })
            }
        },
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
    },
    password: {
        type: String,
        required: true,
        minlength: [5, 'min password length are 5 character']
    },
    projectsInvitation: [{type: Schema.Types.ObjectId, ref: 'Project'}],
})

userSchema.pre('save', function(next) {
    this.password = hashPw(this.password)
    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User