const router = require('express').Router()
const {createArticle, getAllArticles, getArticleById, updateArticle,deleteAritcle, searchArticleOptions, searchArticleByAuthorName} = require('../controllers/articleController')
const {validate} = require('../validators')
const {rules:createArticleRule} = require('../validators/article/createArticle')
const {rules:updateArticleRule} = require('../validators/article/updateArticle.js')

router.post('/createArticle',[createArticleRule,validate],createArticle)
router.get('/getAllArticles',getAllArticles)
router.get('/getArticle/:id',getArticleById)
router.get('/searchArticle',searchArticleOptions)
router.get('/searchByAuthorName',searchArticleByAuthorName)
router.put('/updateArticle/:id/:authorId',[updateArticleRule,validate],updateArticle)
router.delete('/deleteArticle/:id',deleteAritcle)

module.exports = router

