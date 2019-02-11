const List = require('../models/list')
const User = require('../models/user')

class ListController {

    static allList(req, res) {
        List
            .find({$or:[{master: req.headers.id}, {members:{_id: req.headers.id}}]})
            .populate('members')
            .populate('master')
            .then((lists) => {
                res.status(200).json(lists)

            })
            .catch((err) => {
                res.status(500).json({status: "Internal Server Error"})
            })  
    }

    static findList(req, res) {
        List
            .findById(req.params.listId)
            .populate('members')
            .populate('master')
            .then((list) => {
                if (!list) {
                    res.status(404).json({status: 'List Not Found'})
                } else {
                    res.status(200).json(list)
                }
            })
            .catch((err) => {
                res.status(500).json({status: 'Internal Server Error'})
            })
    }

    static createList(req, res) {
        let members = req.body.members.split(',')
        req.body.members = members
        // console.log('====', req.body)
        List
            .create(req.body)
            .then((list) => {
                res.status(201).json(list)
            })
            .catch((err) => {
                res.status(400).json({err: err})
            })
    }

    static addMember(req, res) {
        let name = null
        User
            .findOne({email: `${req.body.email}`})
            .then((user) => {
                name = user.name
                if (!user) {
                    res.status(404).json({status: 'User Not Found'})
                } else {
                    return List.updateOne({_id: req.params.listId}, {$push: {members: user._id}}, {new: true})
                }
            }) 
            .then((list) => {
                res.status(200).json({member: name, status: 'Member Added'})
            })
            .catch((err) => {
                res.status(500).json({status: 'Internal Server Error'})
            })
        
    }

    static deleteList(req, res) {
        List   
            .deleteOne({_id: req.params.listId})
            .then((list) => {
                console.log('===', list)
                res.status(200).json({status: 'List Deleted'})
            })
            .catch((err) => {
                res.status(500).json({status: 'Internal Server Error'})
            })
    }
}

module.exports = ListController