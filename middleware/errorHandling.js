const customError = require('../Error/customError');
const {StatusCodes} = require('http-status-codes')
const errorHandling = (err,req,res,next)=>{
    if(err instanceof customError){
        return res.status(err.statusCode).json({message:err.message})
    }else{
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:"something went wrong"})
    }
}
module.exports = errorHandling;