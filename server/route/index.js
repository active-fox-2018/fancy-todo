const route = require('express')()
const user = require('./user')
const task = require('./task')
const project = require('./project')
const projectTask = require('./projectTask')
const userValidation = require('../middlewares/userValidation')
const memberProjectAuth = require('../middlewares/memberProjectAuth')
const userAuth = require('../middlewares/userAuth')
const { loginUser, gSignIn } = require('../controllers/userController')
const { weatherForecast } = require('../controllers/weatherController')

route.get('/', (req, res) => {
    res.send('Fancy ToDo')
})

route.use('/users', user)
route.use('/tasks', userAuth, task)
route.use('/projects', userAuth, project)
route.use('/projecttasks', userAuth, memberProjectAuth, projectTask)

route.post('/login', userValidation, loginUser)
route.post('/gauth', gSignIn)
route.post('/weathers', userAuth, weatherForecast)

module.exports = route