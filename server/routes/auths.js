var express = require('express');
var router = express.Router();
const authController = require('../controllers/authController')

router.post('/googleLogin', authController.loginGoogle)
router.post('/verify', authController.verifyUser)

module.exports = router;