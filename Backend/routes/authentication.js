const express=require('express')
const router=express.Router()
const {registerUser,loginUser}=require('../controllers/userAuth')
router.post('/user/register',registerUser)
router.post('/user/login',loginUser)

module.exports=router