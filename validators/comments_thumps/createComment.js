const {body} = require('express-validator')

exports.rules =(() =>{
    return [
        body('comment').notEmpty(),
    ]
})()