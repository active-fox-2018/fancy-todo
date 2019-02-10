const express = require('express')
const router = express.Router()
const userController = require('../controller/userController')
const googleController = require('../controller/googleController')
const todoController = require('../controller/todoController')
const projectController = require('../controller/projectController')

const access = require('../middlewares/access')

router.post('/fancytodo', userController.create)
router.post('/signin',userController.login)
router.post('/google',googleController.signin)
router.post('/fancytodo/:email',access,todoController.create)
router.post('/verify', googleController.tokenVerification)
router.post('/projectTodo', projectController.create)

router.get('/fancytodo', userController.findAll)
router.get('/fancytodo/:email', userController.findOne)

router.patch('/fancytodo/:id',access, todoController.update)
router.delete('/fancytodo/:id', access, todoController.delete)


module.exports = router