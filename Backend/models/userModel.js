const mongoose=require('mongoose')
const {ObjectID}=mongoose.Schema.Types
const userSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    name:{
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
    wishlist:[
        {
            type:ObjectID,
            ref:'PRODUCTS'
        }
    ],
    cartItems:[
        {
            type:ObjectID,
            ref:'PRODUCTS'
        }
    ],
    address:{
        streetName:{type:String},
        city:{type:String},
        state:{type:String},
        country:{type:String},
        postalCode:{type:Number}
    },
    profilePic:{
        type:String
    }
})
const USER=mongoose.model('USER',userSchema)
module.exports=USER