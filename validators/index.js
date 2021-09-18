const {validationResult} = require('express-validator')

exports.validate = (req,res,next) =>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        
        return res.status(400).json({error: "Make sure all Entities are not Empty"})
    }
    next()
}