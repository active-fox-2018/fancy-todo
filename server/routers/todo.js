const router = require('express').Router()
const TodoController = require('../controllers/todo')

router.post('/', TodoController.create)
router.get('/', TodoController.findAll)


module.exports = router