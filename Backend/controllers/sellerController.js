const ORDER=require('../models/ordersModel')
const PRODUCTS=require('../models/productModel')
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
// ------------Complete orders by the seller---------------//
const completeOrders=async(req,res)=>{
    try{
    const {productID}=req.body
    // const orders=await ORDER.findOne({_id:req.params.orderID})
    // // if(!orders.sellersID.includes(req.seller._id)){
    // //     return res.status(403).json({error:'Seller not authorized to modify this order!'})
    // // }
    // return res.status(200).json(orders)
    const updateOrders=await ORDER.updateMany({},{$set:{completedItems:[]}})
    if(!updateOrders) return res.status(500).json({error:'Could not update'})
    return res.status(200).json({message:'Updated..'})

    }
    catch(error){
        return res.status(500).json({error:'Internal server error'})
    }

}

module.exports={getSellerOrders,completeOrders}