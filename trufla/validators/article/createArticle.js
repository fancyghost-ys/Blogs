const {body} = require('express-validator')

exports.rules =(() =>{
    return [
        body('title').notEmpty(),
        body('body').notEmpty(),
        body('authorId').notEmpty()
    ]
})()