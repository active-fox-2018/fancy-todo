const List = require('../models/list')

function authorizeMember(req, res, next) {
    List
        .findOne({_id: req.params.listId})
        .then((list) => {
            console.log(list)
            let isMember = false
            list.members.forEach(member => {
                if (member._id == req.headers.id) {
                    isMember = true
                } 
            })
            if (isMember) {
                next()
            } else {
                res.status(401).json({status: 'Only members allowed to edit task'})
            }
        })
        .catch((err) => {
            res.status(500).json({status: 'Internal Server Error'})
        })
}

module.exports = authorizeMember