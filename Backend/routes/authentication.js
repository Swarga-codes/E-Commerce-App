const express=require('express')
const router=express.Router()
const {registerUser,loginUser}=require('../controllers/userAuth')
const {registerSeller,loginSeller}=require('../controllers/sellerAuth')
const authorize=require('../middlewares/authorisation')
const USER=require('../models/userModel')
router.post('/user/register',registerUser)
router.post('/user/login',loginUser)
router.post('/seller/register',registerSeller)
router.post('/seller/login',loginSeller)
//update database
// router.put('/update',async(req,res)=>{
// const addField=await USER.updateMany({},{$set:{ordersList:[]}})
// if(!addField) return res.status(500).json({error:'Couldnt update existing docs...'})
// return res.status(200).json({message:'Database updated....'})
// })
module.exports=router