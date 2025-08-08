const customError = require('../Error/customError'); // Import custom error class
const {StatusCodes} = require('http-status-codes') // Import HTTP status codes

// Express middleware for centralized error handling
const errorHandling = (err,req,res,next)=>{
    const custom = {
        message : err.message || "Something went wrong",
        statusCode: err.StatusCodes || StatusCodes.INTERNAL_SERVER_ERROR 
    }

    if(err instanceof customError){
        // If error is a custom error, use its status code and message
        return res.status(err.statusCode).json({message:err.message})
    }

    // Handle MongoDB duplicate key error
    if (err.code && err.code === 11000) {
        custom.message = `Duplicate value entered ${err.keyValue} field, choose another value`
        custom.statusCode = StatusCodes.BAD_GATEWAY
    }

    // Handle Mongoose validation errors
    if (err.name == "ValidationError") {
        custom.message = Object.values(err.errors).map((item) => item.message).join(',')
        custom.statusCode = StatusCodes.BAD_GATEWAY
    }

    // Handle Mongoose cast errors
    if(err.name == "CastError"){
        custom.message = `ID not found ${err.value}`
        custom.statusCode = StatusCodes.NOT_FOUND
    }

    return res.status(custom.statusCode).json({message:custom.message})

}

module.exports = errorHandling; // Export