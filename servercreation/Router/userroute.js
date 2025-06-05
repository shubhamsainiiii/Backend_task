const express = require('express')
const router = express.Router();
const userController = require('../Controller/usercontroller')

router.post('/createuser', userController.createuser)
router.get ('/getalluser', userController.getuser)
router.get ('/getoneuser', userController.getoneuser)


module.exports = router