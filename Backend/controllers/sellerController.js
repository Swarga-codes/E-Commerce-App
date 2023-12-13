const ORDER=require('../models/ordersModel')
// ------------Get Order Details for current SELLER---------------//
const getSellerOrders=async(req,res)=>{
    try{
    const orders=await ORDER.find({sellersID:{$in:[req.seller._id]}}).populate('sellersID').populate('orderItems')
    return res.status(200).json(orders)
    }
    catch(err){
        return res.status(500).json({error:'Internal server error'})
    }
  }


module.exports={getSellerOrders}