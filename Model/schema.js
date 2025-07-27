const mongoose = require('mongoose')

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

const model = mongoose.model('Student',studentSchema)

module.exports = model