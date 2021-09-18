const router = require('express').Router()

router.use('/author',require('./author'))
router.use('/article',require('./article'))
router.use('/user',require('./user'))
router.use('/others',require('./messages'))

module.exports = router