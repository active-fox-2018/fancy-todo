var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController')

router.post('/login', userController.login)
router.post('/register', userController.register)
router.patch('/users/:email', userController.update)
// router.get('/todos', userController.getTodos)

module.exports = router;