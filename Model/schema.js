const mongoose = require('mongoose')

/**Schema is like structure of a document in MongoDB
 * It defines the fields and their types for a student document
 * 
 * In mongoDB, 
 * a collection is like a table in SQL
 * a document is like a record in a table in SQL
 * fields are like columns in a table in SQL
**/
// Define the schema for a student document
const studentSchema = mongoose.Schema({
    name:{
        type:String,
        required: [true, 'Provide Name in Body'],
        trim:true
    },
    grade:{
        type:String,
        default:'D'
    }
})
// Create a model from the schema
// A model is a class that allows us to interact with the collection in MongoDB
const model = mongoose.model('Student',studentSchema)

module.exports = model