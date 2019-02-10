const express = require('express')
const router = express.Router()
const userController = require('../controller/userController')
const googleController = require('../controller/googleController')
const todoController = require('../controller/todoController')

const access = require('../middlewares/access')

router.post('/fancytodo', userController.create)
router.get('/fancytodo', userController.findAll)
router.get('/fancytodo/:email', userController.findOne)
router.post('/signin',userController.login)
router.post('/google',googleController.signin)
router.post('/verify', googleController.tokenVerification)
router.post('/fancytodo/:email',access,todoController.create)
router.patch('/fancytodo/:id',access, todoController.update)
router.delete('/fancytodo/:id', access, todoController.delete)

module.exports = router