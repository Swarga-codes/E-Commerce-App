const PRODUCTS=require('../models/productModel')
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
  if(price<=0 || discountedPrice<=0) return res.status(422).json({error:'Price should be greater than 0'})
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
  return res.status(200).json({error:'Product created successfully'})
};

module.exports = { createProducts };
