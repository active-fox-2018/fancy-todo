var express = require('express');
var router = express.Router();
const authRoute = require('../routes/auths')
const usersRoute = require('../routes/users')
const todoRoute = require('../routes/todos')
const projectRoute = require('../routes/projects')
const middlewares = require('../middlewares/middlewares')

router.use('/auths', authRoute)
router.use('/users', usersRoute)
router.use('/todos',middlewares.isLogin, todoRoute)
router.use('/projects', middlewares.isLogin, projectRoute)
// router.use('/todos',todoRoute) // for testing only
// router.use('/projects', projectRoute)

module.exports = router;
