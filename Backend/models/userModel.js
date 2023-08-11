const mongoose=require('mongoose')
const userSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    phoneNumber:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    userType:{
        type:String,
        required:true
    },
    ShopName:{
        type:String
    },
    wishlist:[
        {
            type:String
        }
    ],
    cartItems:[
        {
            type:String
        }
    ],
    profilePic:{
        type:String
    }
})
const USER=mongoose.model('USER',userSchema)
module.exports=USER