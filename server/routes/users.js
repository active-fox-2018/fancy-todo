const express = require('express')
const router = express.Router()
const UserController = require('../controllers/UserController')
const AuthController = require('../controllers/AuthController')

router.get('/', UserController.findAll) // to search --> /?q=username
router.get('/:id', UserController.findOne)
router.post('/', UserController.create)
router.put('/:id', UserController.update)
router.delete('/:id', UserController.delete)

//users auth routes
router.post('/googleauth', AuthController.googleAuth)
router.post('/register', AuthController.register)
router.post('/login', AuthController.login )

module.exports = router
