const express = require('express')
const router = express.Router()
const controller = require('../controller/studentController')

//GET all Students //POST new student by ID
router.route('/').get(controller.getStudents).post(controller.postStudents)
//GET student by ID //Updated Student By ID //Delete Student By ID
router.route("/:id").get(controller.getStudentById).put(controller.updateStudentById).delete(controller.deleteStudentById)

module.exports = router