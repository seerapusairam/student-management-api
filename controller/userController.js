const model = require('../models/userSchema') 
const {StatusCodes} = require('http-status-codes') // Import HTTP status codes
const {badRequestError,unauthenticatedError} = require('../errors/allErrors')


const postLogin = async (req,res)=>{
    const {email,password} = req.body
    if(!email || !password){
        throw new badRequestError("Please provide the data in body param")
    }

    const user = await model.findOne({email})

    if(!user){
        throw new unauthenticatedError("Invalid Credentials")
    }

    const checkPass = await user.checkPassword(password)

    if(!checkPass){
        throw new unauthenticatedError("Invalid Credentials")
    }

    const token = await user.createJWT()

    res.status(StatusCodes.OK).json({user:{user:user.name},token})

}

const postRegister = async (req,res)=>{

    const user = await model.create({...req.body})

    const token = await user.createJWT()

    res.status(StatusCodes.CREATED).json({user:{user:user.name},token})
}

module.exports = {
    postLogin,
    postRegister
}