const express=require('express')
const router=express.Router()
const cors=require('cors')
router.use(cors())
const {getSellerOrders}=require('../controllers/sellerController')
const Authorization=require('../middlewares/authorisation')
router.get('/orders',Authorization,getSellerOrders)

module.exports=router