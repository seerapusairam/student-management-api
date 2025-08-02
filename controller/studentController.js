const model = require('../Model/schema')
const customError = require('../Error/customError')
const {StatusCodes} = require('http-status-codes')

const getStudents = async (req,res)=>{
    const task = await model.find()
    res.json({
        status:true,
        data:task
    })
}

const getStudentById = async (req,res,next)=>{
    const {id} = req.params

    const find = await model.findById(id)

    if(find == null){
        return next(new customError("Provided data was not there", StatusCodes.NOT_FOUND));
    }
        res.json({
            status:true,
            data:find
        })
}

const postStudents = async (req,res,next)=>{
    const {name:taskName,grade:taskGrade} = req.body

    if(!taskName || !taskGrade){
        return next(new customError("Please provide data to post",StatusCodes.NOT_FOUND))
    }
    const task = await model.create({name:taskName,grade:taskGrade})
    res.status(201).json({
        status:true,
        data :{task}
    })
}

const updateStudentById = async (req,res,next)=>{
    const {id} = req.params
    const task = await model.findOneAndUpdate({ _id: id },req.body,{new:true})
    if (!task) {
        return next(new customError("Student not found",StatusCodes.NOT_FOUND))
    }
    res.json({
        status:true,
        data : task
    })     

}

const deleteStudentById = async (req,res,next)=>{
    const {id} = req.params
    const task = await model.findByIdAndDelete(id)
    if (!task) {
        return next(new customError("Student not found",StatusCodes.NOT_FOUND))
    }
    res.status(201).json({
        status:true,
        data : task
    }) 

}

module.exports = {
    getStudents,
    getStudentById,
    postStudents,
    updateStudentById,
    deleteStudentById
}