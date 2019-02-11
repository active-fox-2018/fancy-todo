const { OAuth2Client } = require('google-auth-library');
const clientId = process.env.CLIENT_ID
const client = new OAuth2Client(clientId);
const User = require('../models/user')
const jwt = require('jsonwebtoken')
require('dotenv').config()

class UserController {
    static signin (req, res) {
        client.verifyIdToken({
            idToken: req.body.id_token,
            audience: clientId,
        })
        .then(ticket => {
            const payload = ticket.getPayload()

            User.findOne({ email: payload.email })
                .then(dataUser => {
                    let newUser = {
                        name: payload.name,
                        email: payload.email,
                        password: 'google'
                    }
                    if (!dataUser) {
                        return User.create(newUser)
                    } else {
                        res.status(200).json({
                            data: dataUser,
                            token: jwt.sign({ id: dataUser._id }, process.env.JWT)
                        })
                    }
                })
                .then(data => {
                    if (data) {
                        res.status(201).json({
                            data,
                            token: jwt.sign({ id: data._id }, process.env.JWT)
                        })
                    }
                })
                .catch(errFind => {
                    res.status(500).json({
                        msg: errFind.message
                    })
                })
        })
        .catch(err => {
            res.status(500).json({
                msg: err.message
            })
        })
    }

    static findOne (req, res) {
        res.status(200).json(req.currentUser)
    }

    static create (req, res) {
        let newUser = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        }

        User.create(newUser)
            .then(data => {
                res.status(201).json({
                    data, 
                    token: jwt.sign({ id: data._id }, process.env.JWT) })
            })
            .catch(err => {
                res.status(500).json({
                    msg: err.message
                })
            })
    }
}

module.exports = UserController
