const router = require('express').Router()
const ListController = require('../controllers/list')
const authorizeMaster = require('../middlewares/authorize-master')
const TaskController = require('../controllers/task')
const authorizeMember = require('../middlewares/authorize-members')

router.get('/', ListController.allList)

router.get('/:listId', ListController.findList)

router.post('/', ListController.createList)

router.put('/:listId', authorizeMaster, ListController.addMember)

router.delete('/:listId', authorizeMaster, ListController.deleteList)

router.get('/:listId/tasks', TaskController.allTask)

router.get('/:listId/:taskId', authorizeMember, TaskController.findTask)

router.post('/:listId/tasks', authorizeMember, TaskController.createTask)

router.put('/:listId/:taskId', authorizeMember, TaskController.editTask)

router.delete('/:listId/:taskId', authorizeMember, TaskController.deleteTask)

module.exports = router