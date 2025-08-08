const model = require('../Model/studentSchema') // Import the student schema/model
const {notFoundError} = require('../Error/allErrors')

// Controller to get students with optional filtering, sorting, and pagination
const getStudents = async (req,res)=>{
    let {grade,sort} = req.query // Extract grade and sort from query params
    let queObj = {}
    if(grade){
        queObj.grade = grade // Filter by grade if provided
    }
    queObj.createdBy = req.user.userId
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
    res.json({task,count:task.length})
}

// Controller to get a student by ID
const getStudentById = async (req,res)=>{
    const {
        user:{userId},
        params:{id}
    } = req
    const find = await model.findOne({
        _id:id,
        createdBy:userId
    }) // Find student by ID

    if(find == null){
        // If not found, send custom error
        throw new notFoundError("Provided data was not there")
    }
    res.json(find)
}

// Controller to create a new student
const postStudents = async (req,res)=>{
    req.body.createdBy = req.user.userId
    const task = await model.create(req.body) // Create new student
    res.json(task)
}

// Controller to update a student by ID
const updateStudentById = async (req,res,next)=>{
    const {
        user:{userId},
        params:{id}
    } = req
    const task = await model.findOneAndUpdate({ _id: id,createdBy:userId },req.body,{new:true}) // Update student
    if (!task) {
        // If not found, send custom error
        throw new notFoundError("Student not found")
    }
    res.json(task)     
}

// Controller to delete a student by ID
const deleteStudentById = async (req,res,next)=>{
    const {
        user:{userId},
        params:{id}
    } = req
    const task = await model.findOneAndDelete({ _id: id,createdBy:userId })
    if (!task) {
        // If not found, send custom error
        throw new notFoundError("Student not found")
    }
    res.json(task) 
}

// Export all controller functions
module.exports = {
    getStudents,
    getStudentById,
    postStudents,
    updateStudentById,
    deleteStudentById
}