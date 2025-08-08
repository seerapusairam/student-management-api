const model = require('../Model/studentSchema') // Import the student schema/model
const {notFoundError} = require('../Error/allErrors')

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
        data:task,
        count:task.length
    })
}

// Controller to get a student by ID
const getStudentById = async (req,res,next)=>{
    const {id} = req.params // Extract ID from route params

    const find = await model.findById(id) // Find student by ID

    if(find == null){
        // If not found, send custom error
        throw new notFoundError("Provided data was not there")
    }
    res.json({
        status:true,
        data:find
    })
}

// Controller to create a new student
const postStudents = async (req,res)=>{
    req.body.createdBy = req.user.userId
    console.log(req.user.userId);
    
    const task = await model.create(req.body) // Create new student
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
        throw new notFoundError("Student not found")
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
        throw new notFoundError("Student not found")
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