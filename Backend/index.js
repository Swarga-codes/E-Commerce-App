const express=require('express')
const app=express()
const dotenv=require('dotenv')
dotenv.config()
const mongoose=require('mongoose')
const PORT=5000 ||  process.env.PORT
mongoose.connect(process.env.MONGO_URL)
mongoose.connection.on('connected',()=>{
    console.log('Connected to mongodb')
})
mongoose.connection.on('error',()=>{
    console.log('Couldnt connect to mongodb')
})


app.use(express.json())
app.get('/',(req,res)=>{
res.send('Hello')
})

app.listen(PORT,()=>{
    console.log(`Server listening on port ${PORT}`)
})