const Todo = require('../models/todo')
const dateConvert = require('../helpers/dateConverter')

class TodoController {
    static create(req, res) {
        Todo
            .create({
                name: req.body.name,
                description: req.body.description,
                status: req.body.status,
                dueDate: req.body.dueDate
            })
            .then((createResult => {
                res.status(201).json({ msg: `todo created`, data: createResult })
            }))
            .catch(err => {
                res.status(500).json({ err: err.message })
            })
    }

    static findAll(req, res) {
        Todo
            .find({})
            .then(findResult => {
                // console.log(findResult)
                // findResult.forEach(result => {
                //     result.tanggal = ''
                //     result.tanggal = dateConvert(result.dueDate)
                // })
                res.status(200).json({ msg: `array of find result`, data: findResult })
            })
            .catch(err => {
                res.status(500).json({ err: err.message })
            })
    }

    static changeStatus(req, res) {
        Todo
            .findById(req.params.id)
            .then(findResult => {
                if (!findResult) res.status(404).json({ msg: "todo not found" })
                else {
                    // res.status(200).json({msg: `find` ,data :findResult})
                    if (findResult.status === 'uncomplete') {
                        return Todo.update({ $set: { status: 'complete' } })
                            .then((result) => {
                                res.status(200).json({ msg: 'update success code complete 01' , data :result })
                            })
                    }
                    else {
                        return Todo.update({ $set: { status: 'uncomplete' } })
                            .then((result) => {
                                res.status(200).json({ msg: 'update success code uncomplete 02', data :result })
                            })
                    }
                }
            })
            .catch(err => {
                res.status(500).json({ err: err.message })
            })
    }

    static update(req,res) {
        Todo
            .findByIdAndUpdate(req.params.id, {$set : req.body}, {new : true} )
                .then(updateResult => {
                    if(!updateResult) res.status(404).json({ msg: "todo not found" })
                    else res.status(200).json({msg : 'data successfuly updated' ,data : updateResult})
                })
                .catch(err => {
                    res.status(500).json(err)
                })
    }

    static delete (req,res) {
        Todo
            .findByIdAndDelete(req.params.id)
                .then(deleteResult => {
                    if(!deleteResult) res.status(404).json({msg:"todo not found"})
                    else res.status(200).json({msg : 'data successfuly delete', data:deleteResult})
                })
                .catch(err => {
                    res.status(500).json(err)
                })
    }
}

module.exports = TodoController