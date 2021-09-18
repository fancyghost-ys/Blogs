const Author = require('../models').author
const config = require('../config/index')
const shortid = require('shortid')


exports.createAuthor = async (req, res) => {
    try {
        await Author.create({
            id: shortid.generate(),
            name: req.body.name,
            jobTitle: req.body.jobTitle
        }).then(author => {
            return res.status(200).json(author);
        }
        ).catch(err => {
            err.errors.map(e => error = e.message)
            return res.status(400).json({ error })
        })
    }
    catch (error) {
        return res.status(500).json({ error: error.message })
    }
}


exports.signInAuthor = async (req, res) => {
    try {
        const name = req.body.name
        const author = await Author.findOne({
            where: {
                name
            }
        })
        if (!author) {
            return res.status(400).json({ error: 'Author not found, Try Again' })
        }
        return res.status(200).json({ author })
    }
    catch (error) {
        return res.status(500).json({ error: "Invalid Data, Make sure you entry true data" })
    }
}



exports.getAllAuthors = async (req, res) => {
    try {
        await Author.findAll().then(authors => {
            return res.status(200).json(authors)
        })
            .catch(err => console.log(err.errors))
    }
    catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

exports.getAuthorById = async (req, res) => {
    const id = req.params.id
    try {
        await Author.findOne({
            where: {
                id
            }
        }).then(author => {
            if (!author) {
                return res.status(400).json({ error: "There is not Author found for these ID" })
            }
            return res.status(200).json(author)
        }).catch(err => console.log(err))
    }
    catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

exports.updateAuthor = async (req, res) => {
    try {
        if (req.body.id) {
            delete req.body.id
            console.log('Sorry, ID is primary key cannot updated from here........')
        }
        await Author.update(req.body, {
            where: {
                id: req.params.id
            },
            returning: true,
            individualHooks: true
        }).then(author => {
            if (!author) {
                return res.status(400).json({ error: "There is not Author found for these ID" })
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


exports.deleteAuthor = async (req, res) => {
    const id = req.params.id
    try {
        await Author.findOne({
            where: {
                id
            }
        }).then(async (author) => {
            await author.destroy()
            return res.status(200).json({ message: 'Author deleted successfully' })
        }).catch(error => {
            return res.status(400).json({ error: 'Author not found, Please Enter valid Id' })
        })
    }
    catch (error) {
        return res.status(500).json({ error })
    }
}