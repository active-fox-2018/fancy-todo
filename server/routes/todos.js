var express = require('express');
var router = express.Router();
const todo = require('../controllers/todos')
const { isLogin, checkOwner } = require('../middlewares')

router.use(isLogin)
router.get('/', todo.getAll)
router.get('/:todoId', todo.getOne)
router.post('/', todo.create)
router.put('/:todoId', checkOwner, todo.update)
router.delete('/:todoId', checkOwner, todo.delete)

module.exports = router;
