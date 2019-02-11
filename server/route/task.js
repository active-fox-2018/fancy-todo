const route = require('express')()
const { 
    createTask, 
    findAllTask, 
    findOneTask, 
    updateTask, 
    deleteTask } = require('../controllers/taskController')
const taskValidation = require('../middlewares/taskValidation.js')

route.post('/', createTask)
route.get('/', taskValidation, findAllTask)
route.get('/:id', taskValidation, findOneTask)
route.put('/:id', taskValidation, updateTask)
route.delete('/:id', taskValidation, deleteTask)

module.exports = route