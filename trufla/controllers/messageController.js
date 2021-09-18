const shortid = require('shortid')
const models = require('../models')
const User = models.user
const Comment = models.comments
const Article = models.article
const Thumb = models.thumbs
const sequelize = require('sequelize')
const { QueryTypes } = require('sequelize');

exports.addComments = async (req, res) => {
    let articleId = req.params.articleId
    let userId = req.params.userId
    let article = await Article.findOne({
        where: {
            id: articleId
        }
    })
    let user = await User.findOne({
        where: {
            id: userId
        }
    })
    if (!article || !user) {
        return res.status(400).json({ error: 'Invalid comments make sure the article and user is true' })
    }
    try {
        await Comment.create({
            id: shortid.generate(),
            comment: req.body.comment,
            articleId,
            userId

        }).then(newComment => {
            return res.status(200).json(newComment);
        }
        ).catch(err => {
            err.errors.map(e => error = e.message)
            return res.status(400).json({ error })
        })
    }
    catch (error) {
        return res.status(400).json({ error })

    }
}


exports.thumbsUpArticle = async (req, res) => {
    let articleId = req.params.articleId
    let userId = req.params.userId
    let article = await Article.findOne({
        where: {
            id: articleId
        }
    })
    let user = await User.findOne({
        where: {
            id: userId
        }
    })
    if (!article || !user) {
        return res.status(400).json({ error: 'Invalid Thumb make sure the article and user is true' })
    }
    try {
        await Thumb.create({
            id: shortid.generate(),
            thumb: true,
            articleId,
            userId

        }).then(thumb => {
            return res.status(200).json(thumb);
        }
        ).catch(err => {
            err.errors.map(e => error = e.message)
            return res.status(400).json({ error })
        })
    }
    catch (error) {
        console.log(error)
        return res.status(400).json({ error })

    }
}

// ("select a.title ,c.thumb ,count(*) from thumbs c join articles a on a.id = c.articleId group by c.articleId order by count(*) desc");


exports.sortArticleByThumbs = async (req, res) => {
    const limit = 10
    try {
        await Thumb.findAll({
            attributes: {
                include: [
                    [sequelize.fn('COUNT', sequelize.col('thumbs.thumb')), 'count']
                ]
            },
            include: [{
                attributes: {},
                model: Article,
                duplicating: false,
                required: false
            }],
            group: ['thumbs.articleId'],
            order: [[sequelize.fn('COUNT', sequelize.col('thumbs.thumb')), 'DESC']],
            limit
        }).then(thumbsCount => {
            return res.status(200).json(thumbsCount);

        }).catch(err => {
            console.log(err)
            err.errors.map(e => error = e.message)
            return res.status(400).json({ error })
        })
    }
    catch (error) {
        return res.status(400).json({ error })

    }
}