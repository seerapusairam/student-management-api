// Custom error class for handling application-specific errors

class customError extends Error{
    constructor(message,statusCode){
        super(message) // Call parent Error constructor
        this.statusCode = statusCode // Attach HTTP status code to error
    }
}

module.exports = customError // Export the custom error class