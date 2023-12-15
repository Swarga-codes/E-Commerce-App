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
    if(!productID) return res.status(422).json({error:'Product ID cannot be empty!'})
    const orders=await ORDER.findOne({_id:req.params.orderID})
    if(!orders.sellersID.includes(req.seller._id)){
        return res.status(403).json({error:'Seller not authorized to modify this order!'})
    }
    const product=await PRODUCTS.findOne({_id:productID})
    if(!product) return res.status(404).json({error:'Product not found!'})
    if(!orders.orderItems.includes(productID)) return res.status(404).json({error:'Product does not exist for this order!'})
    if(product.createdBy+""!==req.seller._id+"") return res.status(403).json({error:'Seller not authorized to modify this product!'}) 
    const updateOrder=await ORDER.findOneAndUpdate({_id:req.params.orderID},{$push:{completedItems:productID}},{new:true})
if(!updateOrder) return res.status(500).json({'error':'Could not update order items!'})
if(updateOrder.completedItems.length===updateOrder.orderItems.length){
    const updateOrderCompletionStatus=await ORDER.updateOne({_id:req.params.orderID},{$set:{isComplete:true}},{new:true})
    if(!updateOrderCompletionStatus) return res.status(500).json({error:'Could not update completion status, try again!'})
}
    return res.status(200).json({message:'Order Status updated successfully!'})
    }
    catch(error){
        return res.status(500).json({error:'Internal server error'})
    }

}

module.exports={getSellerOrders,completeOrders}