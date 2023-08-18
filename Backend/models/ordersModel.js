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