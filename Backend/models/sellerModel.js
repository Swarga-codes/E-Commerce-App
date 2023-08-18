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
        default:""
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
    completedOrders:[
        {
            type:ObjectID,
            ref:'ORDER'
            }
    ],
    profilePic:{
        type:String,
        default:"https://cdn-icons-png.flaticon.com/512/456/456212.png"
    }
})

const SELLER=mongoose.model('SELLER',sellerSchema)
module.exports=SELLER