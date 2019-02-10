const Projects = require('../models/project')

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
                return Projects
                    .find({ admin: req.body.admin })
                    .populate('members')
                    .then(data => {
                        res.status(201).json({ message: 'new project created', data: data })
                    })
            })
            .catch(err => {
                res.status(500).json({ message: 'internal server error' })
            })
    }

    static findWhere(req, res) {
        Projects
            .find({ members : req.body.id})
            .then(data => {
                res.status(200).json({data : data})                
            })
            .catch(err => {
                res.status(500).json({message : 'internal server error'})
            })
    }

    static addMember(req,res) {
        Projects
            .findByIdAndUpdate({
                _id : req.params.id
            }, { 
                $push: { todoList: newTodo._id } 
            },{ 
                new : true
            })
    }
}

module.exports = projectController