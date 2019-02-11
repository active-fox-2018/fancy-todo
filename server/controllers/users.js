const client_id = '381474162119-8ltjkr6dl2g3qvm2q8tfp5sqopoo5646.apps.googleusercontent.com'
const { User } = require('../models')
const { comparePass, sign } = require('../helpers')
const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client(client_id)

module.exports = {
    login(req, res) {
        User
            .findOne({email: req.body.email})
            .then(user => {
                if (user) {
                    if (comparePass(req.body.password, user.password)) {
                        let token = sign({email: user.email})
                        res.status(200).json({token})
                    } else {
                        res.status(400).json({
                            msg: "email / password wrong"
                        })
                    }
                } else {
                    res.status(400).json({
                        msg: "email / password wrong"
                    })
                }
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    msg: "Internal server error",
                    err: err
                })
            })
    },
    register(req, res) {
        let newUser = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        }
        User
            .create(newUser)
            .then(user => {
                res.status(201).json(user)
            })
            .catch(err => {
                res.status(500).json({
                    msg: "Internal server error",
                    err: err
                })
            })
    },
    googleLogin(req, res) {
        let payload = {}
        client.verifyIdToken(({
            idToken: req.body.token,
            audience: client_id
        }))
        .then(ticket => {
            payload = ticket.getPayload()
            return User.findOne({email: payload.email})
        })
        .then(user => {
            if (user) {
                let token = sign({email: user.email})
                res.status(200).json({token})
            } else {
                let newUser = {
                    name: payload.name,
                    email: payload.email,
                    password: 'google'
                }
                User
                    .create(newUser)
                    .then(user => {
                        let token = sign({email: user.email})
                        res.status(201).json({user, token})
                    })
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                msg: 'internal server error',
                err: err
            })
        })
    },
}