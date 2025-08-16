const express = require('express')
const app = express()
const helmet = require('helmet');
require('dotenv').config()
require('express-async-errors')
const db = require('./db/connect')
const errorHandling = require('./middleware/errorHandling')
const notFoundMiddleware = require('./middleware/notFound')
const verifyToken = require('./middleware/authentication')
const limit = require('./middleware/rateLimiting')

const studentRouter = require('./router/studentRouter')
const userRouter = require('./router/userRouter')
const PORT = process.env.PORT || 3000

//middleware to parse JSON bodies
app.use(express.json())
//This middleware is used for rate limiting
app.use(limit)
//this middleware is used secure your app by setting various HTTP response headers.
app.use(helmet());

app.use('/api/user',userRouter)
app.use('/api/students',verifyToken, studentRouter)
// Middleware for centralized error handling
// This should be the last middleware in the stack
app.use(notFoundMiddleware)
app.use(errorHandling)
// Start the server and connect to the database
// The start function initializes the database connection and starts the server
const start = async()=>{
    try{
        await db(process.env.URL)
        app.listen(PORT, "0.0.0.0") // as i'm running in a container to listen i opened to all
    }catch(err){
        console.log(err)
    }
}

start()