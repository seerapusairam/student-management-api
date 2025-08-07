const model = require('../Model/userSchema') 
const {StatusCodes} = require('http-status-codes') // Import HTTP status codes
const {badRequestError,unauthenticatedError} = require('../Error/allErrors')


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

    res.status(StatusCodes.OK).json({user})

}

const postRegister = async (req,res)=>{

    const user = await model.create({...req.body})

    res.status(StatusCodes.CREATED).json({user})
}

module.exports = {
    postLogin,
    postRegister
}