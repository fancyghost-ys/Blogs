const router = require('express').Router()
const { addComments, thumbsUpArticle, sortArticleByThumbs} = require('../controllers/messageController')
const {validate} = require('../validators')
const {rules:createCommentRule} = require('../validators/comments_thumps/createComment')



router.post('/thumbsUp/:articleId/:userId',thumbsUpArticle)
router.post('/addComments/:articleId/:userId',[createCommentRule,validate],addComments)
router.get('/sortArticleByThumbs',sortArticleByThumbs)

module.exports = router