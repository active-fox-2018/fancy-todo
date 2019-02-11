const List = require('../models/list')

function authorizeMaster(req, res, next) {
    List
        .findOne({_id: req.params.listId})
        .then((list) => {
            if (list.master == req.headers.id) {
                console.log(list.master)
                next()
            } else {
                res.status(401).json({status: "Only list master is allowed to make changes"})
            }
        })
        .catch((err) => {
            res.status(401).json({status: "Only list master is allowed to make changes"})
        })
}

module.exports = authorizeMaster