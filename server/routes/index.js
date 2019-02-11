var express = require('express');
var router = express.Router();
const userRouter = require('./users')
const todoRouter = require('./todos')
const projectRouter = require('./projects')

router.use(userRouter)
router.use('/todos', todoRouter)
router.use('/projects', projectRouter)

module.exports = router;
