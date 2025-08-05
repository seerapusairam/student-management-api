const customError = require('./customError')
const {StatusCodes} = require('http-status-codes')

class badRequestError extends customError{
    constructor(messsage){
        super(message)
        this.statusCode = StatusCodes.BAD_REQUEST
    }
}

module.exports = badRequestError