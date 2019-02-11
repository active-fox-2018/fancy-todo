const User = require('../models/user')
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client('1044222864150-j6i5dsrch11cddpg7jic43rfeq4jg5qe.apps.googleusercontent.com')//(process.env.CLIENT_ID);
const generateJWT = require('../helpers/generateJWT')
const bcrypt = require('bcryptjs');
const decode = require('../helpers/verifyUser')

class Controller {
    static login(req, res) {
        let userData;
        if (!req.body.token) {
            return User.findOne({
                email: req.body.email
            })
            .then(userFound => {
                if (!userFound) {
                    res
                        .status(404)
                        .json({
                            msg: `Email Not Found`
                        })    
                } else {
                    let decrypt = bcrypt.compareSync(req.body.password, userFound.password);
                    if (!decrypt) {
                        res
                            .status(404)
                            .json({
                                msg: `Password not match`
                            })  
                    } else {
                        let token = generateJWT(userFound)
                        res
                            .status(200)
                            .json(token)
                    }
                }
            })
            .catch(err => {
                console.log(err)
                res
                    .status(500)
                    .json({
                        msg: `Internal Server Error`,
                        err: err
                    })                
            })
        } else {
            client.verifyIdToken({
                idToken: req.body.token,
                audience: process.env.CLIENT_ID
            })
            .then(ticket => {
                const payload = ticket.getPayload()
                userData = payload
                return User.findOne({
                    email: payload.email
                })
            })
            .then(user => {
                if (!user) {
                    return User.create({
                        full_name: userData.name,
                        email: userData.email,
                        password: '000000'
                    })
                    .then(newUser => {
                        let token = generateJWT(newUser)
                        res
                            .status(200)
                            .json(token)
                    })
                } else {
                    let token = generateJWT(user)
                    res
                        .status(200)
                        .json(token)
                }
            })
            .catch(err => {
                console.log(err)
                res
                    .status(500)
                    .json({
                        msg: `Internal Server Error`,
                        err: err
                    })
            })
        }
    }

    static signup(req, res) {
        User.create(req.body)
        .then(newUser => {
            res
                .status(201)
                .json(newUser)
        })
        .catch(err => {
            let modelValidation = ''
            if (err.errors.full_name) modelValidation = 'full_name'
            else if (err.errors.email) modelValidation = 'email'
            else modelValidation = 'password'
            res
                .status(500)
                .json({
                    msg: `Internal Server Error`,
                    err: err,
                    pathValidation: modelValidation
                })
        })
    }

    static decode(req, res) {
        try {
            let verify = decode(req.body.token)
            res.json(verify)
        } catch (err) {
            res
                .json({
                    msg: `Token Invalid`
                })
        }
    }

    static getTodos(req, res) {
        User.findOne({
            _id: req.params.id
        })
        .populate('todos')
        .then(user => {
            res.json(user.todos)
        })
        .catch(err => {
            console.log(err)
            res
                .status(500)
                .json({
                    msg: `Internal Server Error`,
                    err: err
                })            
        })
    }

    static getProjects(req, res) {
        User.findById(req.params.id)
        .populate('projects')
        .then(user => {
            res.json(user.projects)
        })
        .catch(err => {
            console.log(err)
            res
                .status(500)
                .json({
                    msg: `Internal Server Error`,
                    err: err
                })            
        })
    }

    //masi error
    static allUsers(req, res) {
        User.find({})
        .then(users => {
            res
            .status(200)
            .json({
                users: users
            })
        })
        .catch(err => {
            console.log(err)
            res
                .status(500)
                .json({
                    msg: `Internal Server Error`,
                    err: err
                })     
        })
    }
}

module.exports = Controller