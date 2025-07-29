const { customError } = require('../Error/customError');
const errorHandling = (err,req,res,next)=>{
    if(err instanceof customError){
        return res.status(err.statusCode).json({message:err.message})
    }else{
        return res.status(500).json({message:"something went wrong"})
    }
}
module.exports = errorHandling;