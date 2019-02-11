const router = require('express').Router()
const users = require('./users')
const todos = require('./todos')
const projects = require('./projects')

router.use('/', users)
router.use('/todos', todos)
router.use('/projects', projects)

module.exports = router