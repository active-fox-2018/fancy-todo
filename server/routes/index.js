const router = require('express').Router()
const axios = require('axios')
const userController = require('../controllers/usercontroller')
const todoController = require('../controllers/todoController')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')
const projectController = require('../controllers/projectController')


router.post('/users', userController.create)
router.post('/users/login', userController.loginManual)
router.post('/users/google', userController.loginByGoogle)
router.get('/weather', function(req, res) {
  axios.get('http://api.openweathermap.org/data/2.5/weather?q=Jakarta&APPID=7cf702b4bc6f70bb9e209f9e916c918a')
  .then(({data} )=> {
    res.status(200).json(data)
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({msg : 'internal server error'})
  })
  
})


router.use(authentication)
router.get('/todos/:id', todoController.findAll)
router.use(authorization)
router.post('/todos', todoController.create)
router.patch('/todos', todoController.updatePatch)
router.delete('/todos', todoController.delete)
router.put('/todos', todoController.update)
router.post('/projects', projectController.create)


module.exports = router