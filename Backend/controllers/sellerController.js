const ORDER=require('../models/ordersModel')
// ------------Get Order Details for current SELLER---------------//
const getSellerOrders=async(req,res)=>{
    try{
    const orders=await ORDER.find({sellersID:{$in:[req.seller._id]}}).populate('sellersID').populate('orderItems').populate({
        path:'orderItems',
        populate:{
            path:'createdBy',
            model:'SELLER'
        }
    })
    return res.status(200).json(orders)
    }
    catch(err){
        return res.status(500).json({error:'Internal server error'})
    }
  }
const completeOrders=async(req,res)=>{
    try{
    const orders=await ORDER.updateMany({},{$set:{completeCount:0}})
    if(!orders) return res.status(500).json({error:'Could not update orders'})
    return res.status(200).json({message:'Updated all orders!'})
    }
    catch(error){
        return res.status(500).json({error:'Internal server error'})
    }

}

module.exports={getSellerOrders,completeOrders}