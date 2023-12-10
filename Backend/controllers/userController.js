const ORDER = require('../models/ordersModel')
const PRODUCTS = require('../models/productModel')
const USER=require('../models/userModel')
const SELLER=require('../models/sellerModel')
//------------Update User---------------//
const updateUserData=async(req,res)=>{
const {email,name,phoneNumber,profilePic,address}=req.body
if(!email || !name || !phoneNumber || !profilePic){
    return res.status(400).json({error:'Some fields are empty'})
}
const updateUser=await USER.findByIdAndUpdate(req.user._id,{
   $set: {email,
    name,
    phoneNumber,
    address,
    profilePic}
},
{
    new:true
})
if(!updateUser) return res.status(500).json({error:'Could not update user details'})
const {
    wishList,
    cartItems,
  }=updateUser
return res.status(200).json({message:'User details updated successfully', userData: {
    email,
    name,
    phoneNumber,
    wishList,
    cartItems,
    address,
    profilePic,
  }})
}
// ------------Place Order---------------//
const createOrder=async(req,res)=>{
  const {orderItems,orderAmount,orderType}=req.body
  if(orderItems?.length===0 || !orderAmount || !orderType){
    return res.status(400).json({error:'Please include the required fields'})
  }
  //Checking the order items
  let checkAmt=0
  const sellersID=[]
  for(let i=0;i<orderItems.length;i++){
    let currItem=await PRODUCTS.findById(orderItems[i])
    if(!currItem) return res.status(404).json({error:'Item does not exist'})
    // if(!(sellersID.includes(currItem.createdBy))) return res.status(404).json({error:'Seller not found for the product'})
  sellersID.push(currItem.createdBy)
    if(currItem?.quantity<=0) return res.status(422).json({error:'One or more Item(s) is out of stock!'})
    checkAmt+=currItem.price;
  }
  //Check whether the price is fine or not
  if(checkAmt!==orderAmount) return res.status(400).json({error:'Order Amount inappropriate'})
if(orderType==='Cash On Delivery'){
const newOrder=await new ORDER({
  orderItems,
  orderedBy:req.user._id,
  sellersID,
  orderAmount,
  orderType,
  address:req.user.address
})
const orderPlaced=await newOrder.save()
if(!orderPlaced){
  return res.status(500).json({error:'Could not process your order, try again'})
}
//Update product stock
for(let i=0;i<orderItems.length;i++){
  const currentProduct=await PRODUCTS.findOne({_id:orderItems[i]})
  currentProduct.quantity-=1
  const updateProductQuantity=await PRODUCTS.updateOne({_id:currentProduct._id},{$set:{quantity:currentProduct.quantity}},{new:true})
  if(!updateProductQuantity) return res.status(500).json({error:'Could not update the existing product data,try again'}) 
}
//Update sellers orders list
for(let i=0;i<sellersID.length;i++){
  const seller=await SELLER.updateOne({_id:sellersID[i]},{$push:{ordersList:orderPlaced._id}},{new:true})
  if(!seller) return res.status(500).json({error:'Could not update seller orders list'})
}
//update users orders list
const updateUserOrderListAndCart=await USER.updateOne({_id:req.user._id},{$push:{ordersList:orderPlaced._id},$set:{cartItems:[]}},{new:true})
if(!updateUserOrderListAndCart) return res.status(500).json({error:'Could not update user orders list and cart'})
return res.status(200).json({message:'Order Placed Successfully'})
}
if(orderType==='UPI'){
  return res.status(422).json({error:'Currently under development please try COD'})
}
}
// ------------Get Order Details for current USER---------------//
const getUserOrders=async(req,res)=>{
  const orders=await ORDER.find({orderedBy:req.user._id}).populate('orderItems').populate('sellersID')
  return res.status(200).json(orders)
}
module.exports={updateUserData,createOrder,getUserOrders}