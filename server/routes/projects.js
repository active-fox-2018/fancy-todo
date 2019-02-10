var express = require('express');
var router = express.Router();
const Controller = require('../controllers/projectController')
const { verifyMongooseId, verifyProject, verifyTask, verifyUser, getmemberId } = require('../middlewares')

router.use(verifyUser)
router.get('/', Controller.findAll)
router.get('/:id', verifyMongooseId, verifyProject, Controller.findOne)
router.post('/', Controller.create)
router.put('/:id/add', verifyMongooseId, verifyProject, getmemberId, Controller.addMember)
router.put('/:id/kick', verifyMongooseId, verifyProject, getmemberId, Controller.deleteMember)
router.delete('/:id', verifyMongooseId, verifyProject, Controller.delete)
module.exports = router;
