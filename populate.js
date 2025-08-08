//this file is used to populate the database with initial data
// It connects to the database and uploads data from a local file
const express = require('express')
const app = express()
require('dotenv').config()
const data = require('./data')
const model = require('./Model/studentSchema')
const db = require('./Database/connect')

const start = async()=>{
    try{
        await db(process.env.URL)
        console.log("cleaning database..")
        // Clean the database before uploading new data
        // This ensures that the database is empty before populating it with new data
        await model.deleteMany()
        console.log("Uploading data.")
        // Upload the data from the local file to the database
        // This populates the database with initial data
        await model.create(data)
        console.log("Data upload was completed.")
        app.listen(5001, ()=>{
        console.log("Server was listening at 5001...")
        // Close the database connection after the server starts
        process.exit(0)
    })
    }catch(err){
        console.log(err)
    }
}

start()