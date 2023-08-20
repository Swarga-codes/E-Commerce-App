const express=require('express')
const router=express.Router()
const authorisation=require('../middlewares/authorisation')
const {createProducts}=require('../controllers/productsController')
router.post('/create',authorisation,createProducts)
module.exports=router