const ORDER=require('../models/ordersModel')
// ------------Get Order Details for current SELLER---------------//
const getSellerOrders=async(req,res)=>{
    const orders=await ORDER.find()
    console.log(req.seller._id)
    return res.status(200).json(orders)
  }


module.exports={getSellerOrders}