const express = require('express')
const app = express()
require('dotenv').config()
require('express-async-errors')
const db = require('./Database/connect')
const errorHandling = require('./middleware/errorHandling')
const notFoundMiddleware = require('./middleware/notFound')

const studentRouter = require('./router/studentRouter')
const userRouter = require('./router/userRouter')

//middleware to parse JSON bodies
app.use(express.json())

app.use('/api/user',userRouter)
app.use('/api/students',studentRouter)
// Middleware for centralized error handling
// This should be the last middleware in the stack
app.use(notFoundMiddleware)
app.use(errorHandling)
// Start the server and connect to the database
// The start function initializes the database connection and starts the server
const start = async()=>{
    try{
        await db(process.env.URL)
        app.listen(5001, ()=>{
        console.log("Server was listening at 5001...")
    })
    }catch(err){
        console.log(err)
    }
}

start()