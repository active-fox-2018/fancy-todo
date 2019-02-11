var express = require('express');
var router = express.Router();
const todoController = require('../controllers/todoController')

// router.use(isLogin)
router.post('/', todoController.create)
router.get('/', todoController.getTodos)
router.get('/:todoId', todoController.readOne)
router.patch('/:todoId', todoController.update)
router.delete('/:todoId', todoController.delete)

module.exports = router;