const model = require('../Model/userSchema') 
const {StatusCodes} = require('http-status-codes') // Import HTTP status codes
const badRequestError = require('../Error/badRequestError')
const notFoundError = require('../Error/notFoundError')


const postLogin = async (req,res)=>{
    res.json({msg:"in login"})
}

const postRegister = async (req,res)=>{
    res.json({msg:"in Register"})
}

module.exports = {
    postLogin,
    postRegister
}