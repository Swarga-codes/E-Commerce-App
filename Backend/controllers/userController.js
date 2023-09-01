const USER=require('../models/userModel')
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
module.exports={updateUserData}