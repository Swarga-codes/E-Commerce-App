const express=require('express')
const router=express.Router()
const cors=require('cors')
router.use(cors())
const {updateUserData,createOrder}=require('../controllers/userController')
const Authorization=require('../middlewares/authorisation')
router.patch('/updateUser',Authorization,updateUserData)
router.post('/createOrder',Authorization,createOrder)
module.exports=router