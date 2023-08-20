const mongoose=require('mongoose')
const {ObjectID}=mongoose.Schema.Types
const productSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    discountedPrice:{
        type:Number
    },
    quantity:{
        type:Number,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    createdBy:{
        type:ObjectID,
        ref:'SELLER'
    },
    reviews:[
        {postedBy:{type:ObjectID,ref:'USER'},comment:{type:String}}
    ],

},{
    timestamps:true
})
const PRODUCTS=mongoose.model('PRODUCTS',productSchema)
module.exports=PRODUCTS