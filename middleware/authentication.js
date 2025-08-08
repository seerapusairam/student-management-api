const jwt = require('jsonwebtoken')
const {unauthenticatedError} = require('../Error/allErrors')
require('dotenv').config()

const verifyToken = (req,res,next)=>{
    const authHeader = req.headers.authorization
    
    if(!authHeader || authHeader === "Bearer "){
        throw new unauthenticatedError("Invalid Credentials")
    }

    const token = authHeader.split(' ')[1]
    try {
        const verify = jwt.verify(token,process.env.JWT_SECRET)

        req.user = {userId:verify.id,userName:verify.name}
    } catch (error) {
        throw new unauthenticatedError("Invalid Credentials")        
    }
    
    next()
}

module.exports = verifyToken