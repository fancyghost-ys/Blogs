const router = require('express').Router()
const {createAuthor, signInAuthor, getAllAuthors, getAuthorById, updateAuthor, deleteAuthor} = require('../controllers/authorController')
const {validate} = require('../validators')
const {rules:createAuthorRule} = require('../validators/author/createAuthor')
const {rules:signinAuthorRule} = require('../validators/author/signinAuthor')
const {rules:updateAuthorRule} = require('../validators/author/updateAuthor')
router.post('/createAuthor',[createAuthorRule,validate],createAuthor)
router.post('/signInAuthor',[signinAuthorRule,validate],signInAuthor)
router.get('/getAllAuthors',getAllAuthors)
router.get('/getAuthor/:id',getAuthorById)
router.put('/updateAuthor/:id',[updateAuthorRule,validate],updateAuthor)
router.delete('/deleteAuthor/:id',deleteAuthor)

module.exports = router