const routes = require('express').Router()
const TodoController = require('../controllers/todoController')
const UserController = require('../controllers/userController');

// USER
routes.post('/user/signin', UserController.signin)
routes.post('/user/verification', UserController.verify)

//TODO
routes.get('/todo/todo_list', TodoController.findAll)
routes.get('/todo/delete/:id', TodoController.delete)

routes.post('/todo/create', TodoController.create)
routes.post('/todo/update/:id', TodoController.update)

module.exports = routes;