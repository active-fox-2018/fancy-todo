var express = require('express');
var router = express.Router();
const project = require('../controllers/projects')
const { isLogin, checkMember } = require('../middlewares')

router.use(isLogin)
router.get('/', project.myProjects)
router.get('/:projectId', checkMember, project.getOne)
router.post('/', project.create)
router.delete('/:projectId', checkMember, project.delete)

router.post('/:projectId/:userId', checkMember, project.invite)
router.post('/:projectId', checkMember, project.createTodo)
router.put('/:projectId/:todoId', checkMember, project.updateTodo)
router.delete('/:projectId/:todoId', checkMember, project.deleteTodo)

module.exports = router;
