const PRODUCTS=require('../models/productModel');
const USER = require('../models/userModel');
const ORDERS=require('../models/ordersModel')
//------------Create Products---------------//
const createProducts = async(req, res) => {
  const {
    title,
    description,
    category,
    price,
    discountedPrice,
    quantity,
    image,
  } = req.body;
  if (!title || !description || !category || !price || !quantity || !image)
    return res.status(422).json({ error: "One or more fields are missing" });
  const isTitleExists=await PRODUCTS.findOne({title:title})
  if(isTitleExists) return res.status(409).json({error:'Product with the same title already exists'})
  if(description.length<100) return res.status(422).json({error:'Description is too short'})
  if(price<=0 || discountedPrice<0) return res.status(422).json({error:'Price should be greater than 0'})
  if(discountedPrice>=price) return res.status(422).json({error:'Discounted price cannot be greater than or equals price'})
  if(quantity<=0) return res.status(422).json({error:'Quantity should be greater than 0'})
  if(!req.seller) return res.status(403).json({error:'Only sellers can create products'})
  const newProduct=new PRODUCTS({
title,
description,
category,
price,
discountedPrice,
quantity,
image,
createdBy:req.seller._id
})
  const createProduct=await newProduct.save()
  if(!createProduct) return res.status(500).json({error:'Could not create product, try again'})
  return res.status(200).json({message:'Product created successfully'})
};


//------------Display Products---------------//

const displayProducts=async(req,res)=>{
const products=await PRODUCTS.find().sort({_id:-1}).populate("createdBy","shopName email phoneNumber profilePic upiId")
if(!products) return res.status(500).json({error:'Could not fetch products, try again'})
return res.status(200).json(products)
}


//------------My Products---------------//
const myProducts=async(req,res)=>{
const products=await PRODUCTS.find({createdBy:req.seller._id}).sort({_id:-1})
if(!products) return res.status(500).json({error:'Could not fetch products, try again'})
return res.status(200).json(products)
}

//------------Add product to cart---------------//
const addToCart = async (req, res) => {
  const { productId } = req.body;

  if (!productId) {
    return res.status(422).json({ error: 'Product ID cannot be empty' });
  }

  try {
    const isExistingProduct = await PRODUCTS.findById(productId);

    if (!isExistingProduct) {
      return res.status(404).json({ error: 'Product Not Found' });
    }

    const user = await USER.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ error: 'User Not Found' });
    }

    // Check if the product is already in the user's cart
    if (user.cartItems.includes(productId)) {
      return res.status(409).json({ error: 'Product already in cart' });
    }

    // Update the user's cart with the new product
    user.cartItems.push(productId);
    await user.save();

    return res.status(200).json({ message: 'Product added to cart successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'An error occurred' });
  }
};
//------------Get cart items---------------//
const getCartItems=async(req,res)=>{
  const cartItems=await USER.findById(req.user._id,{cartItems:1}).populate('cartItems','title price discountedPrice image category')
  if(!cartItems) return res.status(500).json({error:'Could not fetch cart data'})
  return res.status(200).json(cartItems)
}

//------------Remove cart items---------------//
const removeCartItems=async(req,res)=>{
  const { productId } = req.body;

  if (!productId) {
    return res.status(422).json({ error: 'Product ID cannot be empty' });
  }

  try {
    const isExistingProduct = await PRODUCTS.findById(productId);

    if (!isExistingProduct) {
      return res.status(404).json({ error: 'Product Not Found' });
    }

    let user = await USER.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ error: 'User Not Found' });
    }
    //Check if the cart is empty or not
    if(user.cartItems.length===0){
      return res.status(404).json({error:'Cart is empty'})
    }
    // Check if the product is already in the user's cart
    if (!user.cartItems.includes(productId)) {
      return res.status(409).json({ error: 'Product not present in cart' });
    }

    // Remove the target product from the user's cart 
   user.cartItems=user.cartItems.filter(cart=>cart!=productId)
    await user.save();

    return res.status(200).json({ message: 'Product removed from cart successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'An error occurred' });
  }
}

//------------Delete product---------------//
const deleteProduct=async(req,res)=>{
  try{
  const product=await PRODUCTS.find({_id:req.params.productID})
  if(product.length===0) return res.status(404).json({error:'Product not found'})
  if(product[0].createdBy+""!==req.seller._id+"") return res.status(403).json({error:'User not authorized to perform this action!'})
  const findCurrentProductInOrders=await ORDERS.find()
for(let i=0;i<findCurrentProductInOrders.length;i++){
  if(findCurrentProductInOrders[i].orderItems.includes(req.params.productID)){
    if(findCurrentProductInOrders[i].orderItems.length===1){
      //delete the order itself
      const deleteOrder=await ORDERS.findByIdAndDelete({_id:findCurrentProductInOrders[i]._id})
    }
    else{
      //remove the seller and product
      const updateOrderItems=await ORDERS.updateOne({_id:findCurrentProductInOrders[i]._id},{$pull:{orderItems:req.params.productID}})
      const updateOrderItemsSeller=await ORDERS.updateOne({_id:findCurrentProductInOrders[i]._id},{$pull:{sellersID:{sellerID:product.createdBy}}})
    }
  }
}

  const deleteProduct=await PRODUCTS.findByIdAndDelete(req.params.productID)
  if(!deleteProduct) return res.status(500).json({error:'Could not delete product, try again!'})
  return res.status(200).json({message:'Product deleted successfully!'})
  }
catch(error){
  return res.status(500).json({error:'Internal Server Error'})
}
}
//------------Update product---------------//
const updateProduct=async(req,res)=>{
  try{
  const {title,description,price,discountedPrice,quantity,image}=req.body
  const updatedData=req.body
  if(!title || !description || price<=0 || discountedPrice<=0 || quantity<0 || !image || price<=discountedPrice) return res.status(422).json({error:'Some fields are missing or having inappropriate values!'})
  const findProduct=await PRODUCTS.findOne({_id:req.params.productID})
  if(findProduct=={}) return res.status(404).json({error:'Product not found!'})
  if(findProduct.createdBy+""!==req.seller._id+"") return res.status(403).json({error:'The seller is not authorized to perform this action!'})
  for(const updates in updatedData){
findProduct[updates]=updatedData[updates]
  }
  const updatedProduct=await findProduct.save()
  if(!updatedProduct) return res.status(500).json({error:'Could not update product data'})
  return res.status(200).json({message:'Product data updated successfully!'})
  }
catch(error){
  return res.status(500).json({error:'Internal Server Error'})
}
}

module.exports = { createProducts,displayProducts,myProducts,addToCart,getCartItems,removeCartItems,deleteProduct,updateProduct };