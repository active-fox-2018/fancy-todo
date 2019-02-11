const User = require('../models/user')
const jwt = require('jsonwebtoken');
const Password = require('../helpers/password-encrypt-decrypt')
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client('299733928822-cq5dvg61rfvvn07vj1po12e9ful75hjn.apps.googleusercontent.com');

class UserController {

    static findAll(req, res) {
        User
            .find({})
            .then((users) => {
                res.status(200).json(users)
            })
            .catch((err) => {
                res.status(500).json({status: 'Internal Server Error'})
            })
    }

    static register(req, res) {
        req.body.source = 'manual'
        User
            .create(req.body)
            .then((user) => {
                const token = jwt.sign({ name: req.body.name, email: req.body.email }, process.env.JWT_TOKEN);
                res.status(201).json({user, status: 'User Created', token})
            })
            .catch((err) => {
                if (err.errors) {
                    let key = Object.keys(err.errors)[0]
                    res.status(400).json({msg: err.errors[key].message, key: key})
                } else {
                    res.status(400).json({msg: "Email has been used", key: 'email'})
                }
            })
    }

    static login(req, res) {
        User
            .findOne({email: req.body.email})
            .then((user) => {
                if (!user) {
                    res.status(400).json({status: "Email Not Registered", key: 'email'})
                } else {
                    let isCorrect = Password.decrypt(req.body.password, user.password)
                    if (isCorrect) {
                        const token = jwt.sign({ name: user.name, email: user.email }, process.env.JWT_TOKEN);
                        res.status(200).json({status: 'Login Succeed', token: token, user:user})
                    } else {
                        res.status(400).json({status: 'Wrong Password', key: 'password'})
                    }
                }
            })
            .catch((err) => {
                res.status(500).json({status: 'Internal Server Error'})
            })
    }

    static signin(req, res) {
        let payload = null
        // console.log('=====', req.body.id_token)
        client.verifyIdToken({
            idToken: req.body.id_token,
            audience: '299733928822-cq5dvg61rfvvn07vj1po12e9ful75hjn.apps.googleusercontent.com',  // Specify the CLIENT_ID of the app that accesses the backend
            // Or, if multiple clients access the backend:
            //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
        })
        .then((ticket) => {
            payload = ticket.getPayload();
            // console.log('===========',payload)
            return User.findOne({email: payload.email})
            // console.log(payload)
        })
        .then((user) => {
            // console.log(user)
            if (!user) {
                User
                    .create({
                        name: payload.name,
                        email: payload.email,
                        password: 'random',
                        source: 'google',
                    })
                    .then((user) => {
                        let token = jwt.sign(({name: payload.name, email: payload.email, plain:true}), process.env.JWT_TOKEN, {expiresIn: 60*60})      
                        res.status(201).json({token: token, user:user})
                    })
                    .catch((err) => {
                        console.log(err)
                        res.status(500).json({err: err})
                })
            } else {
                let token = jwt.sign({name: payload.name, email: payload.email, plain:true}, process.env.JWT_TOKEN, {expiresIn: 60*60})
                res.status(200).json({token: token, user:user})
            }
        })
        .catch((err) => {
            res.status(500).json({err: err})
        })
    }

    static authentication(req, res) {
        let decoded = jwt.verify(req.headers.token, process.env.JWT_TOKEN)
        User
            .findOne({email: decoded.email})
            .then((user) => {
                if (!user) {
                    res.status(400).json({msg: "User not found"})
                } else {
                    res.status(200).json({status: 'verified'})
                }
            })
            .catch((err) => {
                res.status(500).json({status: 'Internal Server Error'})
            })
    }

}

module.exports = UserController