const model = require('../Model/schema') // Import the student schema/model
const customError = require('../Error/customError') // Import custom error handler
const {StatusCodes} = require('http-status-codes') // Import HTTP status codes

// Controller to get students with optional filtering, sorting, and pagination
const getStudents = async (req,res)=>{
    let {grade,sort} = req.query // Extract grade and sort from query params
    let queObj = {}
    if(grade){
        queObj.grade = grade // Filter by grade if provided
    }
    let result = model.find(queObj) // Find students matching filter
    if(sort){
        const sortList = sort.split(',').join(' ') // Prepare sort string
        result.sort(sortList) // Apply sorting
    }
    const limit = Number(req.query.limit) || 10 // Set limit (default 10)
    const page = Number(req.query.page) || 1 // Set page (default 1)
    const skip = (page - 1) * limit // Calculate skip for pagination

    result.skip(skip).limit(limit) // Apply pagination
    const task = await result // Execute query
    res.json({
        status:true,
        data:task
    })
}

// Controller to get a student by ID
const getStudentById = async (req,res,next)=>{
    const {id} = req.params // Extract ID from route params

    const find = await model.findById(id) // Find student by ID

    if(find == null){
        // If not found, send custom error
        return next(new customError("Provided data was not there", StatusCodes.NOT_FOUND));
    }
    res.json({
        status:true,
        data:find
    })
}

// Controller to create a new student
const postStudents = async (req,res,next)=>{
    const {name:taskName,grade:taskGrade} = req.body // Extract name and grade

    if(!taskName || !taskGrade){
        // If missing data, send custom error
        return next(new customError("Please provide data to post",StatusCodes.NOT_FOUND))
    }
    const task = await model.create({name:taskName,grade:taskGrade}) // Create new student
    res.status(201).json({
        status:true,
        data :{task}
    })
}

// Controller to update a student by ID
const updateStudentById = async (req,res,next)=>{
    const {id} = req.params // Extract ID from route params
    const task = await model.findOneAndUpdate({ _id: id },req.body,{new:true}) // Update student
    if (!task) {
        // If not found, send custom error
        return next(new customError("Student not found",StatusCodes.NOT_FOUND))
    }
    res.json({
        status:true,
        data : task
    })     
}

// Controller to delete a student by ID
const deleteStudentById = async (req,res,next)=>{
    const {id} = req.params // Extract ID from route params
    const task = await model.findByIdAndDelete(id) // Delete student
    if (!task) {
        // If not found, send custom error
        return next(new customError("Student not found",StatusCodes.NOT_FOUND))
    }
    res.status(201).json({
        status:true,
        data : task
    }) 
}

// Export all controller functions
module.exports = {
    getStudents,
    getStudentById,
    postStudents,
    updateStudentById,
    deleteStudentById
}