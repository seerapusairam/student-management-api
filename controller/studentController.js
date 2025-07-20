const data = require('../data/students')
let students = data.students

const getStudents = (req,res)=>{
    res.json({
        status:true,
        message:students
    })
}

const getStudentById = (req,res)=>{
    const {id} = req.params

    const find = students.find((s)=> s.id === Number(id))

    if(find != null){
        res.json({
            status:true,
            message:find
        })

    }else{
        res.status(404).json({
            status:false,
            message:"ID Not Found"
        })
    }
}

const postStudents = (req,res)=>{
    const {name,grade} = req.body

    if(name){
        if(grade){
            const len = students.length
            const newStudent = {
                id: len + 1,
                name,
                grade
            }
            students.push(newStudent)

            res.status(201).json({
                status:true,
                data : students
            })
        }else{
            res.status(400).json({
                status:false,
                message:"Please provided grade in the body"
            })
        }
    }else{
        res.status(400).json({
            status:false,
            message:"Please provided name in the body"
        })
    }
}

const updateStudentById = (req,res)=>{
    const {id} = req.params
    const {name,grade} = req.body

    const user = students.find((s) => s.id === Number(id))

    if(user){
            if(name){
                if(grade){
                    user.name = name
                    user.grade = grade
                    res.json({
                        status:true,
                        message: user
                    })
                }else{
                    res.status(400).json({
                        status:false,
                        message:"Please provided grade in the body"
                    })
                }
            }else{
                res.status(400).json({
                    status:false,
                    message:"Please provided name in the body"
                })
            }
    }else{
        res.status(404).json({
            status:false,
            message:"ID not found"
            })
    } 
}

const deleteStudentById = (req,res)=>{
    const {id} = req.params

    const findStudent = students.find((s) => s.id === Number(id))

    if(findStudent){
        students = students.filter((s) => s.id !== Number(id))

        res.status(201).json({
            status:true,
            message : students
        })
    }else{
        res.status(404).json({
            status:false,
            message:"Id not found"
        })
    }

}

module.exports = {
    getStudents,
    getStudentById,
    postStudents,
    updateStudentById,
    deleteStudentById
}