const jwt=require('jsonwebtoken')
const USER = require('../models/userModel')
const SELLER = require('../models/sellerModel')
module.exports=async(req,res,next)=>{
    const {authorization}=req.headers
    if(!authorization) return res.status(403).json({error:'Could not authorize'})
    const token=authorization.replace("Bearer ","")
    if(!token) return res.status(404).json({error:'Token not found, login again'})
    const checkToken=await jwt.verify(token,process.env.SECRET_KEY)
    if(!checkToken) return res.status(403).json({error:'Token invalid'})
    if (checkToken.exp < Date.now() / 1000) {
        return res.status(401).json({error:'Token has expired,log in again.'});
      }
    const {_id}=checkToken
    const userdata=await USER.findById(_id)
    if(userdata){
        req.user=userdata
        next()
    }
    else{
    const sellerData=await SELLER.findById(_id)
    req.seller=sellerData
    next()
    }
}