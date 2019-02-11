const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId
const Password = require('../helpers/password-encrypt-decrypt') 
const validateEmail = require('../helpers/email-format-validation')

const UserSchema = new Schema ({
    name: {
        type: String,
        required: 'Name is required'
    },
    email: {
        type: String,
        unique: true,
        required: 'Email address is required',
        validate: [validateEmail, 'Please fill a valid email address'],
        // match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password: {
        type: String,
        minlength: [6, 'Password should be at least 6 characters long'],
    },
    source: String
})

UserSchema.pre("save",function(next) {
    var self = this;
    mongoose.models["User"].findOne({email : self.email},function(err, results) {
        if(err) {
            next(new Error(err));
        } else if(results) { //there was a result found, so the email address exists
            self.invalidate("email", "Email has been used");
            next(new Error("Email has been used"));
        } else {
            next();
        }
    });
    next();
});

UserSchema.pre('save', function() {
    this.password = Password.encrypt(this.password)
})

const User = mongoose.model('User', UserSchema)

module.exports = User