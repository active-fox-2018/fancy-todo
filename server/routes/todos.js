const router = require('express').Router()
const controller = require('../controllers/todoController')

//todos
router.get('/', controller.todolist)
router.get('/:id', controller.findTodo)
router.post('/', controller.addTodo)
router.put('/:id', controller.update)
router.delete('/:id', controller.delete)

module.exports = router