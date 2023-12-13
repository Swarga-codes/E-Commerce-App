const express=require('express')
const app=express()
const dotenv=require('dotenv')
dotenv.config()
const cors=require('cors')
const mongoose=require('mongoose')
const PORT=5000 ||  process.env.PORT
const Authentication=require('./routes/authentication')
const Products=require('./routes/products')
const UserData=require('./routes/user')
const SellerData=require('./routes/seller')
mongoose.connect(process.env.MONGO_URL)
mongoose.connection.on('connected',()=>{
    console.log('Connected to mongodb')
})
mongoose.connection.on('error',()=>{
    console.log('Couldnt connect to mongodb')
})


app.use(express.json())
app.use(cors())
app.use('/api/auth',Authentication)
app.use('/api/products',Products)
app.use('/api/users',UserData)
app.use('/api/sellers',SellerData)
app.get('/',(req,res)=>{
res.send('Hello')
})

app.listen(PORT,()=>{
    console.log(`Server listening on port ${PORT}`)
})