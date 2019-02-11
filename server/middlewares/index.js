const { User, Todo, Project } = require('../models')
const { verify } = require('../helpers')

module.exports = {
    isLogin(req, res, next) {
        try {
            let decoded = verify(req.headers.token)
            User
                .findOne({email: decoded.email})
                .then(user => {
                    if (user) {
                        req.user = user
                        next()
                    } else {
                        res.status(400).json({
                            msg: 'user not found'
                        })
                    }
                })
                .catch(err => {
                    res.status(500).json({
                        msg: 'Internal server error',
                        err: err
                    })
                })
        } catch(err) {
            console.log(err);
            res.status(500).json({
                msg: 'Internal server error',
                err: err
            })
        }
    },
    checkOwner(req, res, next) {
        Todo
            .findById(req.params.todoId)
            .then(todo => {
                if (todo) {
                    if (todo.userId.toString() === req.user._id.toString()) {
                        next()
                    } else {
                        res.status(400).json({
                            msg: 'this is not youre todo'
                        })
                    }
                } else {
                    res.status(400).json({
                        msg: 'todo not found'
                    })
                }
            })
            .catch(err => {
                res.status(500).json({
                    msg: 'Internal server error',
                    err: err
                })
            })
    },
    checkMember(req, res, next) {
        Project
            .findById(req.params.projectId)
            .then(project => {
                let member = project.members.filter(member => member.toString() === req.user._id.toString())
                if (member.length > 0) {
                    next()
                } else {
                    res.status(400).json({msg: "youre not projects member"})
                }
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    msg: 'Internal server error',
                    err: err
                })
            })
    }
}