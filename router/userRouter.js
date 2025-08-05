const express = require('express')
const router = express.Router()

const userController = require('../controller/userController')

router.post('/login',userController.postLogin)
router.post('/register',userController.postRegister)

module.exports = router