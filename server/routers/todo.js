const router = require('express').Router()
const TodoController = require('../controllers/todo')

router.post('/', TodoController.create)
router.get('/', TodoController.findAll)
router.get('/:id', TodoController.changeStatus)
router.put('/:id', TodoController.update)
router.delete('/:id', TodoController.delete)


module.exports = router