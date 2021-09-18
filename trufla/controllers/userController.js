const User = require('../models').user
const shortid = require('shortid')
const Sequelize = require('sequelize');

exports.createUser = async (req, res) => {
    try {
        await User.create({
            id: shortid.generate(),
            userName: req.body.userName,
        }).then(user => {
            return res.status(200).json({ user });
        }
        ).catch(error => {
            err.errors.map(e => error = e.message)
            return res.status(400).json({ error: error })
        })
    }
    catch (error) {
        return res.status(500).json({ error: "Invalid Data, Make sure you entry true data" })
    }
}


exports.signInUser = async (req, res) => {
    try {
        const userName = req.body.userName
        const user = await User.findOne({
            where: {
                userName
            }
        })
        if (!user) {
            return res.status(400).json({ error: 'User not found, Try Again' })
        }
        return res.status(200).json({ user })
    }
    catch (error) {
        return res.status(500).json({ error: "Invalid Data, Make sure you entry true data" })
    }
}