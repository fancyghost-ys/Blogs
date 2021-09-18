const router = require('express').Router()
const { createUser, signInUser } = require('../controllers/userController')
const {validate} = require('../validators')
const {rules:createUserRule} = require('../validators/user/createUser')



router.post('/createUser',[createUserRule,validate],createUser)
router.post('/signInUser',[createUserRule,validate],signInUser)

module.exports = router