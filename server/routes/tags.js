const express = require('express')
const router = express.Router()
const TagController = require('../controllers/TagController')
const isLogin = require('../middlewares/isLogin')

// router.use(isLogin)

router.get('/', TagController.findAll) // to search --> /?q=tagname
router.get('/:id', TagController.findOne)
router.post('/', TagController.create)
router.put('/:id', TagController.update)
router.delete('/:id', TagController.delete)

module.exports = router