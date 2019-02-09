const router = require('express').Router()
const users = require('./users')
const todo = require('./todos')

router.use('/', users)
router.use('/todos', todo)

module.exports = router