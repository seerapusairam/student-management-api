const model = require('../model/studentSchema')
const {notFoundError} = require('../errors/allErrors')
const { redisClient } = require('../config/redisClient')

// Controller to get students with optional filtering, sorting, and pagination
const getStudents = async (req,res)=>{
    // Destructure grade and sort from the query parameters
    let {grade,sort} = req.query 
    // Initialize an empty query object
    let queObj = {}
    // If a grade is provided, add it to the query object
    if(grade){
        queObj.grade = grade 
    }
    // Add the createdBy field to the query object to ensure users only get their own data
    queObj.createdBy = req.user.userId
    // Start building the query by finding students that match the query object
    let result = model.find(queObj) 
    // If a sort parameter is provided, apply it to the query
    if(sort){
        // Format the sort string by replacing commas with spaces
        const sortList = sort.split(',').join(' ') 
        result = result.sort(sortList) 
    }
    // Set the limit for pagination, default to 10
    const limit = Number(req.query.limit) || 10 
    // Set the page for pagination, default to 1
    const page = Number(req.query.page) || 1 
    // Calculate the number of documents to skip
    const skip = (page - 1) * limit 

    // Apply pagination (skip and limit) to the query
    result = result.skip(skip).limit(limit) 
    // Execute the query
    const task = await result 
    // Send the result as a JSON response, including the count of students
    res.json({task,count:task.length})
}

// Controller to get a student by ID
const getStudentById = async (req,res)=>{
    const {
        user:{userId},
        params:{id}
    } = req

    // Create a unique cache key for this student and user
    const cacheKey = `student:${id}:${userId}`

    // Try to find the student in the Redis cache
    const cacheFind = await redisClient.get(cacheKey)

    // If the student is found in the cache, return it
    if(cacheFind){
        return res.json(JSON.parse(cacheFind))
    }

    // If the student is not in the cache, fetch it from the database
    const find = await model.findOne({
        _id:id,
        createdBy:userId
    }) 

    // If the student is not found in the database, throw a notFoundError
    if(!find){
        throw new notFoundError("Not Found")
    }

    // If the student is found in the database, store it in the Redis cache for future requests
    await redisClient.setEx(cacheKey,3600,JSON.stringify(find))

    // Return the student as a JSON response
    res.json(find)
}

// Controller to create a new student
const postStudents = async (req,res)=>{
    // Assign the userId from the authenticated user to the createdBy field of the new student
    req.body.createdBy = req.user.userId
    // Create a new student in the database with the provided request body
    const task = await model.create(req.body) 
    // Return the newly created student as a JSON response
    res.json(task)
}

// Controller to update a student by ID
const updateStudentById = async (req,res,next)=>{
    // Destructure userId from the user object and id from the params
    const {
        user:{userId},
        params:{id}
    } = req

    // Create the cache key to be deleted
    const cachekey = `student:${id}:${userId}`

    // Find and update the student in the database
    const task = await model.findOneAndUpdate({ _id: id,createdBy:userId },req.body,{new:true}) 
    // If the student is not found, throw a notFoundError
    if (!task) {
        throw new notFoundError("Student not found")
    }

    // Delete the cached student data from Redis
    await redisClient.del(cachekey)

    // Return the updated student as a JSON response
    res.json(task)     
}

// Controller to delete a student by ID
const deleteStudentById = async (req,res,next)=>{
    const {
        user:{userId},
        params:{id}
    } = req

    // Create the cache key to be deleted
    const cachekey = `student:${id}:${userId}`

    // Find and delete the student from the database
    const task = await model.findOneAndDelete({ _id: id,createdBy:userId })
    // If the student is not found, throw a notFoundError
    if (!task) {
        throw new notFoundError("Student not found")
    }

    // Delete the cached student data from Redis
    await redisClient.del(cachekey)

    // Return the deleted student as a JSON response
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
