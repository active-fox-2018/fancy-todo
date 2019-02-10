const express = require('express')
const router = express.Router()
const userRoute = require('../routes/users')
const todoRoute = require('../routes/todos')
const projectRoute = require('../routes/projects')
// const tagRoute = require('../routes/tags')

//basic route
router.get('/', (req, res) => {
  console.log('success get basic route')
  res.send('success get basic route')
})

//list of routes
router.use('/users', userRoute)
router.use('/todos', todoRoute)
router.use('/projects', projectRoute)
// router.use('/tags', tagRoute)

module.exports = router