const express=require('express')
const router=express.Router()
const {registerUser}=require('../controllers/userAuth')
router.post('/user/register',registerUser)

module.exports=router