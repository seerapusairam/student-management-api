const express = require('express')
const app = express()

const studentRouter = require('./router/studentRouter')

//middleware to parse json body
app.use(express.json())

app.use('/api/students',studentRouter)

app.listen(5001, ()=>{
    console.log("Server was listening at 5001...")
})