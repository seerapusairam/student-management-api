//this file is to update data to database
const express = require('express')
const app = express()
require('dotenv').config()
const data = require('./data')
const model = require('./Model/schema')
const db = require('./Database/connect')

const start = async()=>{
    try{
        await db(process.env.URL)
        console.log("cleaning database..")
        await model.deleteMany()
        console.log("Uploading data.")
        await model.create(data)
        console.log("Data upload was completed.")
        app.listen(5001, ()=>{
        console.log("Server was listening at 5001...")
        process.exit(0)
    })
    }catch(err){
        console.log(err)
    }
}

start()