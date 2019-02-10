var express = require('express');
var router = express.Router();
const image = require('../helpers/image')
const Controller = require('../controllers/userController')
const { verifyUser } = require('../middlewares')

router.post('/', image.multer.single('image'), image.sendUploadToGCS, Controller.create)
router.post('/gooSign', Controller.signin)
router.get('/', verifyUser, Controller.findOne)
module.exports = router;
