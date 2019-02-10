const mongoose = require('mongoose')
const Schema = mongoose.Schema
const encrypt = require('../helpers/encrypt')
const bcrypt = require('bcrypt')

const userSchema = new Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: 'email required',
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password: {
        type: String,
        required: true
    },
    source: String,
    todoList: [{ type: 'ObjectId', ref: 'Todo' }]
})



userSchema.pre('save', function (next) {
    try {
        var user = this;
        if (!user.isModified('password')) return next();
        encrypt(user, function (err, hash) {
            if (err) {
                next(err)
            } else {
                console.log(hash,"====================");
                
                user.password = hash;
                next();
            }
        })
    } catch (err) {
        next(err)
        console.log(err);

    }

});
const User = mongoose.model('User', userSchema)

module.exports = User