const model = require('../Model/schema')
const { createCustomError } = require('../Error/customError')
const asyncWapper = require('../middleware/asyncWapper')

const getStudents = async (req,res)=>{
    const task = await model.find()
    res.json({
        status:true,
        data:task
    })
}

const getStudentById = asyncWapper(async (req,res,next)=>{
    const {id} = req.params

    const find = await model.findById(id)

    if(find == null){
        return next(createCustomError("Id not found",404))
    }
        res.json({
            status:true,
            data:find
        })
})

const postStudents = asyncWapper(async (req,res,next)=>{
    const {name:taskName,grade:taskGrade} = req.body

    if(!taskName || !taskGrade){
        return next(createCustomError("Please provide data to post",404))
    }
    const task = await model.create({name:taskName,grade:taskGrade})
    res.status(201).json({
        status:true,
        data :{task}
    })
})

const updateStudentById = asyncWapper(async (req,res,next)=>{
    const {id} = req.params
    const task = await model.findOneAndUpdate({ _id: id },req.body,{new:true})
    if (!task) {
        return next(createCustomError("Student not found",404))
    }
    res.json({
        status:true,
        data : task
    })     

})

const deleteStudentById = asyncWapper(async (req,res,next)=>{
    const {id} = req.params
    const task = await model.findByIdAndDelete(id)
    if (!task) {
        return next(createCustomError("Student not found",404))
    }
    res.status(201).json({
        status:true,
        data : task
    }) 

})

module.exports = {
    getStudents,
    getStudentById,
    postStudents,
    updateStudentById,
    deleteStudentById
}