const express = require('express')
const router = express.Router()
const ProjectController = require('../controllers/ProjectController')
const isLogin = require('../middlewares/isLogin')

router.use(isLogin)

router.get('/', ProjectController.findAll) // to search --> /?q=projectname
router.get('/:id', ProjectController.findOne)
router.post('/', ProjectController.create)
router.put('/:id', ProjectController.update)
router.delete('/:id', ProjectController.delete)

module.exports = router