const express = require('express')
const router = express.Router();
const userController = require('../Controller/usercontroller')

router.post('/createuser', userController.createuser)
router.get('/getalluser', userController.getuser)
router.get('/getoneuser', userController.getoneuser)
router.post('/loginuser', userController.login)
router.patch('/reset', userController.login)
router.patch('/forget', userController.forget)
router.post('/agecal', userController.dob)

module.exports = router