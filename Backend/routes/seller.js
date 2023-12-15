const express=require('express')
const router=express.Router()
const cors=require('cors')
router.use(cors())
const {getSellerOrders,completeOrders}=require('../controllers/sellerController')
const Authorization=require('../middlewares/authorisation')
router.get('/orders',Authorization,getSellerOrders)
router.patch('/completeorders/:orderID',Authorization,completeOrders)

module.exports=router