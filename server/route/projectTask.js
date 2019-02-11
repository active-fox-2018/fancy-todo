const route = require('express')()
const { 
    createProjectTask, 
    findAllProjectTask, 
    findOneProjectTask, 
    updateProjectTask, 
    deleteProjectTask } = require('../controllers/taskProjectController')

route.get('/', findAllProjectTask)
route.post('/', createProjectTask)
route.get('/:id', findOneProjectTask)
route.put('/:id', updateProjectTask)
route.delete('/:id', deleteProjectTask)

module.exports = route