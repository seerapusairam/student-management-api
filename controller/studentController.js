const model = require('../Model/schema')

const getStudents = async (req,res)=>{
    const task = await model.find()
    res.json({
        status:true,
        data:task
    })
}

const getStudentById = async (req,res)=>{
    const {id} = req.params

    const find = await model.findById(id)

    if(find != null){
        res.json({
            status:true,
            data:find
        })

    }else{
        res.status(404).json({
            status:false,
            message:"ID Not Found"
        })
    }
}

const postStudents = async (req,res)=>{
    const {name:taskName,grade:taskGrade} = req.body
    try {
        const task = await model.create({name:taskName,grade:taskGrade})
        res.status(201).json({
            status:true,
             data :{task}
        })
    } catch (error) {
        res.json(error)
    }
}

const updateStudentById = async (req,res)=>{
    const {id} = req.params
    try {
        const task = await model.findOneAndUpdate({ _id: id },req.body,{new:true})
        if (!task) {
            return res.status(404).json({ status: false, message: "Student not found" });
        }
        res.json({
            status:true,
            data : task
        }) 
    } catch (error) {
        res.json(error)
    }
}

const deleteStudentById = async (req,res)=>{
    const {id} = req.params
    try {
        const task = await model.findByIdAndDelete(id)
        res.status(201).json({
            status:true,
            data : task
        }) 
    } catch (error) {
        res.json(error)
    }
}

module.exports = {
    getStudents,
    getStudentById,
    postStudents,
    updateStudentById,
    deleteStudentById
}