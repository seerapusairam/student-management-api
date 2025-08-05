const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        requried:[true,"Please provide the name"],
        maxlength:20
    },
    email:{
        type:String,
        requried:[true,"Please provide the email"],
        match:[
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Please provide valid email"
        ],
        unique: true
    },
    password:{
        type:String,
        requried:[true,"Please provide password"],
        minlength:8
    }
})


module.exports = mongoose.model('user',userSchema)