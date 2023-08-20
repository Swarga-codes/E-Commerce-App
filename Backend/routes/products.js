const express=require('express')
const router=express.Router()
const authorisation=require('../middlewares/authorisation')
const {createProducts,displayProducts,myProducts}=require('../controllers/productsController')
router.post('/create',authorisation,createProducts)
router.get('/display',displayProducts)
router.get('/myProducts',authorisation,myProducts)
module.exports=router