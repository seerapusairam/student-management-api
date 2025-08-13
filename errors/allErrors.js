const customError = require('./customError')
const unauthenticatedError = require('./unauthenticated')
const notFoundError = require('./notFoundError')
const badRequestError = require('./badRequestError')

module.exports = {
  customError,
  unauthenticatedError,
  notFoundError,
  badRequestError,
}
