const express=require('express')
const router=express.Router()
const authorisation=require('../middlewares/authorisation')
const {createProducts,displayProducts}=require('../controllers/productsController')
router.post('/create',authorisation,createProducts)
router.get('/display',displayProducts)
module.exports=router