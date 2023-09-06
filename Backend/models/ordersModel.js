const mongoose=require('mongoose')
const {ObjectID}=mongoose.Schema.Types
const ordersSchema=new mongoose.model({
    orderItems:[
        {
           type:ObjectID,
           ref:'PRODUCTS' 
        }
    ],
    orderedBy:{
        type:ObjectID,
        ref:'USER'
    },
    sellersID:[{
        type:ObjectID,
        ref:'SELLER'
    }
    ],
    orderAmount:{
        type:Number,
        required:true
    },
    orderType:{
        type:String,
        required:true
    },
    address:{
        streetName:{type:String},
        city:{type:String},
        state:{type:String},
        country:{type:String},
        postalCode:{type:Number}
    },
    isComplete:{
        type:Boolean,
        default:false
    }
},
{
    timestamps:true
}
)
const ORDER=mongoose.model('ORDER',ordersSchema)
module.exports=ORDER