const route = require('express')()
const { 
    createProject, 
    findAllProject, 
    findOneProject, 
    deleteProject,
    groupInvitation,
    addProjectMember,
    removeMember } = require('../controllers/projectController')

const { projectInviteAuth, deleteValidation } = require('../middlewares/projectValidation')

route.get('/', findAllProject)
route.post('/', createProject)
route.post('/invitation', projectInviteAuth, groupInvitation)
route.get('/:id', findOneProject)
route.patch('/:id', addProjectMember)
route.patch('/remove-member/:id', removeMember)
route.delete('/:id', deleteValidation, deleteProject)

module.exports = route