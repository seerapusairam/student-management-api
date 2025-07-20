const express = require('express')
const router = express.Router()
const controller = require('../controller/studentController')

//GET all Students
router.get('/', controller.getStudents)
//GET student by ID
router.get('/:id',controller.getStudentById)
//POST new student by ID
router.post('/', controller.postStudents)
//Updated Student By ID
router.put('/:id', controller.updateStudentById)
//Delete Student By ID
router.delete('/:id', controller.deleteStudentById)

module.exports = router