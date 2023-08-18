const jwt=require('jsonwebtoken')
const USER = require('../models/userModel')
const SELLER = require('../models/sellerModel')
module.exports=async(req,res,next)=>{
    const {authorization}=req.headers
    if(!authorization) return res.status(403).json({error:'Could not authorize'})
    const token=authorization.replace("Bearer ","")
    if(!token) return res.status(404).json({error:'Token not found, login again'})
    const checkToken=await jwt.verify(token,process.env.SECRET_KEY)
    if(!checkToken) return res.status(403).json({error:'Token expired or invalid'})
    const {_id}=checkToken
    const userdata=await USER.findById(_id)
    if(userdata){
        req.user=userdata
        next()
    }
    const sellerData=await SELLER.findById(_id)
    req.seller=sellerData
    next()
}