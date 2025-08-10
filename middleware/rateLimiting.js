const ratelimit = require('express-rate-limit')

const limiter = ratelimit({
    windowMs: 10 * 60 * 1000, //it will be in milliseconds only 
    max: 50, // number of req per windowMS
    message: 'Too many requests from this IP, please try again later.',
})


module.exports = limiter