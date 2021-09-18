const Author = require('../models').author
const Article = require('../models').article
const shortid = require('shortid')
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

exports.createArticle = async (req, res) => {
    try {
        const author = await Author.findOne({
            where: {
                id: req.body.authorId
            }
        })
        if (!author) {
            return res.status(400).json({ error: 'Operation cannot complete Author not found' })
        }
        await Article.create({
            id: shortid.generate(),
            title: req.body.title,
            body: req.body.body,
            authorId: req.body.authorId

        }).then(article => {
            return res.status(200).json(article);
        }
        ).catch(err => {
            err.errors.map(e => error = e.message)
            return res.status(400).json({ error })
        })
    }
    catch (error) {
        return res.status(500).json({ error: "Invalid Data, Make sure you entry true data" })
    }
}


exports.getAllArticles = async (req, res) => {
    try {
        await Article.findAll({
            attributes: {},
            include: [{
                attributes: {},
                model: Author,
                duplicating: false,
                required: false
            }]
        })
            .then(article => {
                return res.status(200).json(article)
            })
            .catch(err => {
                console.log(err)
                return res.status(400).json({ err })

            })
    }
    catch (error) {
        return res.status(500).json({ error })
    }
}

exports.getArticleById = async (req, res) => {
    const id = req.params.id
    try {
        await Article.findOne({
            where: {
                id
            }
        }).then(article => {
            if (!article) {
                return res.status(400).json({ error: "There is not article found for these ID" })
            }
            return res.status(200).json(article)
        }).catch(err => {
            console.log(err)
            return res.status(400).json({ err })
        })
    }
    catch (error) {
        return res.status(500).json({ error })
    }
}

exports.updateArticle = async (req, res) => {
    try {
        if (req.body.id) {
            delete req.body.id
            delete req.body.authorId

            console.log('Sorry, ID is primary key and Forigein key cannot updated from here........')
        }
        const author = await Author.findOne({
            where: {
                id: req.params.authorId
            }
        })
        if (!author) {
            return res.status(400).json({ error: 'Invalid Author Id Enter Exist Author' })
        }
        await Article.update(req.body, {
            where: {
                id: req.params.id,
                authorId: req.params.authorId
            },
            returning: true,
            individualHooks: true
        }).then(article => {
            if (!article) {
                return res.status(400).json({ error: "There is not Article found for these ID" })
            }
            return res.status(200).json(author)
        }).catch(err => {
            err.errors.map(e => error = e.message)
            return res.status(400).json({ error })
        })
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({ error: 'Please Enter valid ID' })
    }
}



exports.deleteAritcle = async (req, res) => {
    const id = req.params.id
    try {
        await Article.findOne({
            where: {
                id
            }
        }).then(async (article) => {
            await article.destroy()
            return res.status(200).json({ message: 'Article deleted successfully' })
        }).catch(error => {
            return res.status(400).json({ error: 'Article not found, Please Enter valid Id' })
        })
    }
    catch (error) {
        return res.status(500).json({ error })
    }
}


exports.searchArticleOptions = async (req, res) => {
    let title = req.query.title ? req.query.title : '';
    let body = req.query.body ? req.query.body : ''
    let sortBy = req.query.sortBy ? req.query.sortBy : 'createdAt';
    let limitTo = req.query.limit ? parseInt(req.query.limit) : 5;
    try {
        await Article.findAll({
            where: {
                [Op.or]: {
                    title: { [Op.like]: `%${title}%` },
                    body: { [Op.like]: `%${body}%` }
                }
            },
            order: [
                [`${sortBy}`, 'ASC'],
            ],
            limit: limitTo
        }).then(article => {
            return res.status(200).json(article)
        }).catch(error => {
            console.log(error)
            return res.status(400).json({ error: error })

        })
    } catch (error) {
        return res.status(400).json({ error: error })

    }
}



exports.searchArticleByAuthorName = async (req, res) => {
    let name = req.query.name ? req.query.name : '';
    try {
        await Article.findAll({
            include: [{
                model: Author,
                require: true,
                where: {
                    name: req.query.name
                }

            }]
        }).then(article => {
            return res.status(200).json(article)
        }).catch(error => {
            console.log(error)
            return res.status(400).json({ error: error })

        })
    } catch (error) {
        return res.status(400).json({ error: error })

    }
}
