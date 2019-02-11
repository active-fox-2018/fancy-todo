const router = require('express').Router()
const TodoController = require('../controllers/controller_todo')
const authenticateUser = require('../middlewares/authentication')
const authorizedUser = require('../middlewares/authorization')

router.use(authenticateUser)
router.get('/', TodoController.all)
router.post('/', TodoController.create)

// router.use(authorizedUser)
// router.put('/:id', TodoController.update)
// router.delete('/:id', TodoController.delete)

router.put('/:id', authorizedUser, TodoController.update)
router.delete('/:id', authorizedUser, TodoController.delete)

module.exports = router