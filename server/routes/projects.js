const controller = require('../controllers/projectController')
const router = require('express').Router()

router.post('/', controller.createProject)
router.get('/', controller.allProjects)
router.get('/:id', controller.findProject)
router.delete('/:id', controller.deleteProject)

module.exports = router
