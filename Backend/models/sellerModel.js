const mongoose=require('mongoose')
const {ObjectID}=mongoose.Schema.Types
const sellerSchema= new mongoose.Schema({
    shopName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phoneNumber:{
        type:String,
        required:true
    },
    upiId:{
        type:String,
    },
    password:{
        type:String,
        required:true
    },
    myProducts:[
        {
        type:ObjectID,
        ref:'PRODUCTS'
        }
    ],
    ordersList:[
        {
        type:ObjectID,
        ref:'ORDER'
        }
    ],
    approvedOrders:[
        {
            type:ObjectID,
            ref:'ORDER'
        }
    ],
    completedOrders:[
        {
            type:ObjectID,
            ref:'ORDER'
            }
    ],
    profilePic:{
        type:String
    }
})

const SELLER=mongoose.model('SELLER',sellerSchema)
module.exports=SELLER