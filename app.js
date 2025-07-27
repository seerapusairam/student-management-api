const express = require('express')
const app = express()
require('dotenv').config()
const db = require('./Database/connect')

const studentRouter = require('./router/studentRouter')

//middleware to parse json body
app.use(express.json())

app.use('/api/students',studentRouter)

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