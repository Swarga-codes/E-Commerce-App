const express=require('express')
const app=express()
const dotenv=require('dotenv')
dotenv.config()

const PORT=5000 ||  process.env.PORT
app.use(express.json())
app.get('/',(req,res)=>{
res.send('Hello')
})

app.listen(PORT,()=>{
    console.log(`Server listening on port ${PORT}`)
})