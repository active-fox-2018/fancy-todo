function checkCond(req, res, next) {
    if(!req.body.email) {
        res.status(400).json({msg: 'Please fill in all the form'})
    } else if (!req.body.password) {
        res.status(400).json({msg: 'Please fill in all the form'})
    } else {
        next()
    }
}

module.exports = checkCond