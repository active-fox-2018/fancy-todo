const express = require('express')
const router = express.Router()
const projectController = require('../controllers/projectController')
const middleware = require('../middlewares/middlewares')

router.post('/', projectController.create)
router.get('/', projectController.getProjectByUser)
router.post('/:projectId/todos', middleware.isAuthorizedMember, projectController.addTodo)
router.delete('/:projectId/todos/:todoId', middleware.isAuthorizedMember, projectController.deleteTodo)

module.exports = router