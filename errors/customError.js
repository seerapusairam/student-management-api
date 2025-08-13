// Custom error class for handling application-specific errors

class customError extends Error{
    constructor(message){
        super(message) // Call parent Error constructor
    }
}

module.exports = customError // Export the custom error class