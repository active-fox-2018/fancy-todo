const User = require('../models/User')
const jwt = require('jsonwebtoken')
const { comparePw } = require('../helpers/hashPw')
const {OAuth2Client} = require('google-auth-library');
const CLIENT_ID = '345583050402-lodmrm0cm2u683nj3stser78q1lgmflp.apps.googleusercontent.com'
const client = new OAuth2Client(CLIENT_ID);

require('dotenv').config()

module.exports = {
    findOneUser: (req, res) => {
        User
            .findById(req.params.id)
            .populate('projectsInvitation')
            .then(user => {
                res.status(200).json(user)
            })
            .catch(err => {
                res.status(500).json(err.errors)
            })
    },
    registerUser: (req, res) => {
        let newUser = { name, email, password } = req.body
        User
            .create(newUser)
            .then(user => {
                res.status(201).json(user)
            })
            .catch(err => {
                res.status(500).json(err.errors)
            })
    },
    loginUser: (req, res) => {
        User
            .findOne({email: req.body.email})
            .then(user => {
                if (user) {
                    if (comparePw(req.body.password, user.password)) {
                        let payload = {
                            email: user.email,
                            name: user.name
                          }
                        let token = jwt.sign(payload, process.env.JWT_SECRET)
                        res.status(200).json({ token, id: user._id })
                    } else {
                        res.status(400).json({ msg: 'Email/password is wrong!' })
                    }
                } else {
                    res.status(400).json({ msg : 'Email/password is wrong!' })
                }
            })
            .catch(err => {
                res.status(500).json(err)
            })
    },
    gSignIn: (req, res) => {
        async function verify() {
            const ticket = await client.verifyIdToken({
                idToken: req.body.token,
                audience: CLIENT_ID,
            });
            const payload = ticket.getPayload();
            const userid = payload['sub'];
            User
                .findOne({email: payload.email})
                .then((user) => {
                    if (user) {
                        let payload = {
                            email: user.email,
                            name: user.name
                          }
                        let token = jwt.sign(payload, process.env.JWT_SECRET)
                        res.status(200).json({ token, id: user._id })
                    } else {
                        let userData = {
                            name: payload.name,
                            email: payload.email,
                            password: 12345
                        }
                        User.create(userData)
                            .then(newUser => {
                                let payload = {
                                    email: user.email,
                                    name: user.name
                                  }
                                let token = jwt.sign(payload, process.env.JWT_SECRET)
                                res.status(200).json({ token, id: user._id })
                            })
                            .catch(err => {
                                res.status(500).json(err)
                            })
                    }
                })
                .catch((err) => {
                    console.log(err)
                    res.status(500).json(err)
                });
          }
          verify().catch(console.error);
    }
}