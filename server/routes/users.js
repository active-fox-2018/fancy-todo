var express = require('express');
var router = express.Router();
const user = require('../controllers/users')

router.post('/register', user.register)
router.post('/login', user.login)
router.post('/googleLogin', user.googleLogin)

module.exports = router;
