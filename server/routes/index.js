const routes = require('express').Router();
const { gLogin, createUser, login } = require('../controllers/userController');
const { createTask, readTask, updateTask, deleteTask } = require('../controllers/todoController');
const { verifyLogin } = require('../middlewares/checkLogin');

routes.get('/', function (req, res) {
  res.send({ message: 'Fancy Todo Apps' });
});

// User Routes
routes.post('/verify_account', gLogin);
routes.post('/sign_up', createUser);
routes.post('/login', login);

//Task Routes
routes.post('/tasks', verifyLogin, createTask);
routes.get('/tasks', verifyLogin, readTask);
routes.put('/tasks', verifyLogin, updateTask);
routes.delete('/tasks', verifyLogin, deleteTask);

module.exports = routes;