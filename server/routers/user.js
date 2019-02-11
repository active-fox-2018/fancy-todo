const router = require('express').Router()
const ModelController = require('../controllers/user')

router.post('/googleAuth',ModelController.signin)
router.post('/',ModelController.create)

module.exports = router