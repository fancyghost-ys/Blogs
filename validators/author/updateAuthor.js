const {body} = require('express-validator')

exports.rules =(() =>{
    return [
        body('name').notEmpty(),
        body('jobTitle').notEmpty()
    ]
})()