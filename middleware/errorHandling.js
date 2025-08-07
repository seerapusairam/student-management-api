const customError = require('../Error/customError'); // Import custom error class
const {StatusCodes} = require('http-status-codes') // Import HTTP status codes

// Express middleware for centralized error handling
const errorHandling = (err,req,res,next)=>{
    console.log(err)
    if(err instanceof customError){
        // If error is a custom error, use its status code and message
        return res.status(err.statusCode).json({message:err})
    }else{
        // For all other errors, return generic server error
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:err})
    }
}

module.exports = errorHandling; // Export