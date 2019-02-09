const router = require('express').Router()
const controller = require('../controllers/todoController')

router.get('/', controller.todolist)
router.post('/', controller.addTodo)
// router.put('/:todoId', controller.update)
// router.get('/:id', controller.findTodo)
// router.delete('/:id', controller.delete)

module.exports = router