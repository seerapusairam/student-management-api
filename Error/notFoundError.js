const customError = require('./customError')
const {StatusCodes} = require('http-status-codes')

class notFoundError extends customError{
    constructor(messsage){
        super(message)
        this.statusCode = StatusCodes.NOT_FOUND
    }
}

module.exports = notFoundError