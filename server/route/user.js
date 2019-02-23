const route = require('express')()
const { registerUser, findOneUser } = require('../controllers/userController')

route.get('/', (req, res) => {
    res.send('User Route')
})

route.get('/:id', findOneUser)
route.post('/', registerUser)

module.exports = route