const Projects = require('../models/project')
const User = require('../models/user')

class projectController {
    static create(req, res) {
        console.log(req.body);

        Projects.create({
            name: req.body.name,
            description: req.body.description,
            admin: req.body.admin,
            dueDate: req.body.dueDate,
            members: req.body.admin
        })
            .then(data => {
                // console.log(data,"======================");

                return User.findOneAndUpdate({
                    _id: req.body.admin
                }, {
                        $push: { projects: data._id }
                    }, {
                        new: true
                    })
                    .then(data => {
                        res.status(200).json({ message: 'member added' })
                    })
                // return Projects
                //     .find({ admin: req.body.admin })
                //     .populate('members')
                //     .then(data => {
                //         res.status(201).json({ message: 'new project created', data: data })
                //     })
            })
            .catch(err => {
                res.status(500).json({ message: 'internal server error' })
            })
    }

    static findWhere(req, res) {
        User
            .find({ email: req.params.email })
            .populate('projects')
            .then(data => {
                console.log(data, "=========================")

                res.status(200).json({ data: data })
            })
            .catch(err => {
                res.status(500).json({ message: 'internal server error' })
            })
    }

    static addMember(req, res) {
        let newMember = ''
        User.find({
            email: req.body.email
        })
            .then(user => {
                console.log(user);

                newMember = user[0]
                return Projects
                    .findByIdAndUpdate({
                        _id: req.params.id
                    }, {
                            $push: { members: user[0]._id }
                        }, {
                            new: true
                        })
                    .then(data => {
                        console.log(data);

                        return User.findOneAndUpdate({
                            _id: newMember._id
                        }, {
                                $push: { projects: data._id }
                            }, {
                                new: true
                            })
                            .then(data => {
                                res.status(200).json({ message: 'member added' })
                            })
                    })
            })

            .catch(err => {
                res.status(500).json({ message: 'internal server error' })
            })
    }

    static getProjectTodo(req, res) {
        console.log(req.params.id, "=============params");

        Projects
            .find({ _id: req.params.id })
            .populate('todoList')
            .then(data => {
                console.log(data, "=============data input============")

                res.status(200).json({ data: data[0] })
            })
            .catch(err => {
                res.status(500).json({ message: 'internal server error' })
            })
    }

    static delete(req, res) {
        Projects
            .findOneAndDelete({ _id: req.params.id })
            .then(data => {
                res.status(200).json({ message: 'delete member success', data: data })
            })
            .catch(err => {
                console.log(err);
                
                res.status(500).json({ message: 'internal server error', error: err })
            })
    }
}

module.exports = projectController