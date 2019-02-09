const controller = require('../controllers/userController')
const router = require('express').Router()

router.post('/', controller.login)
router.post('/signup', controller.signup)
router.post('/verify', controller.decode)

module.exports = router
