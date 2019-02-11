const router = require('express').Router()
const UserController = require('../controllers/user')

router.get('/', UserController.findAll)

router.post('/', UserController.register)

router.get('/authentication', UserController.authentication)

router.post('/login', UserController.login)

router.post('/authentication/google', UserController.signin)

module.exports = router