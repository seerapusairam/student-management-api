const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()

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

userSchema.pre('save',async function(){
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password,salt)
})

userSchema.methods.checkPassword = async function(userPassword){
    const isMatch = await bcrypt.compare(userPassword,this.password)
    return isMatch
}

userSchema.methods.createJWT = async function(){
    const token = await jwt.sign(
        {userId:this._id,userName:this.name},
        process.env.JWT_SECRET,
        {
            expiresIn:process.env.JWT_EXP
        }
    )
    return token
}

module.exports = mongoose.model('user',userSchema)