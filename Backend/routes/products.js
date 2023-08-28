const express=require('express')
const router=express.Router()
const authorisation=require('../middlewares/authorisation')
const {createProducts,displayProducts,myProducts,addToCart}=require('../controllers/productsController')
router.post('/create',authorisation,createProducts)
router.get('/display',displayProducts)
router.get('/myProducts',authorisation,myProducts)
router.patch('/addToCart',authorisation,addToCart)
module.exports=router