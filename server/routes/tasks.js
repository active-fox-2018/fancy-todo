var express = require('express');
var router = express.Router();
const Controller = require('../controllers/taskController')
const { verifyUser, verifyMongooseId, verifyTask, authorizedUserTask, authorizedProjectMember } = require('../middlewares')

router.use(verifyUser)
router.get('/', Controller.findAll)

// create biasa
router.post('/', Controller.create)

//create ke dalam project
router.post('/project', authorizedProjectMember, Controller.create)

router.get('/:id', verifyMongooseId, verifyTask, Controller.findOne)
router.put('/:id', verifyMongooseId, verifyTask, authorizedUserTask, Controller.update)
router.delete('/:id', verifyMongooseId, verifyTask, authorizedUserTask, Controller.delete)

module.exports = router;
