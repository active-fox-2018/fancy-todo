const controller = require('../controllers/userController')
const router = require('express').Router()

router.post('/', controller.login)
router.post('/signup', controller.signup)
router.post('/verify', controller.decode)
router.get('/:id', controller.getTodos)
// router.put('/:id/add-todo', controller.addTodo)

module.exports = router
