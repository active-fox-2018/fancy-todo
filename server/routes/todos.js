const express = require('express')
const router = express.Router()
const TodoController = require('../controllers/TodoController')
const isLogin = require('../middlewares/isLogin')
const { isTodoOwner } = require('../middlewares/isAuthorized')

router.use(isLogin)

router.get('/', TodoController.findAll) // to search --> /?q=todoname
router.get('/:id', isTodoOwner, TodoController.findOne)
router.post('/', TodoController.create)
router.put('/:id', isTodoOwner, TodoController.update)
router.delete('/:id', isTodoOwner, TodoController.delete)

module.exports = router
