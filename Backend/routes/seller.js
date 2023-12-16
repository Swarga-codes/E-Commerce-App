const express=require('express')
const router=express.Router()
const cors=require('cors')
router.use(cors())
const {getSellerOrders,completeOrders,updateSeller}=require('../controllers/sellerController')
const Authorization=require('../middlewares/authorisation')
router.get('/orders',Authorization,getSellerOrders)
router.patch('/updateseller/:sellerID',Authorization,updateSeller)
router.patch('/completeorders/:orderID',Authorization,completeOrders)

module.exports=router