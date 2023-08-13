const mongoose=require('mongoose')
const dotenv=require('dotenv')
dotenv.config({ path: '../.env'})
const USER=require('../models/userModel')
const validator=require('validator')
const bcrypt=require('bcrypt')
const passRequirements = {
    minLength: 8,        // Minimum length of the password
    minLowercase: 1,     // Minimum number of lowercase characters
    minUppercase: 1,     // Minimum number of uppercase characters
    minNumbers: 1,       // Minimum number of digits
    minSymbols: 1,       // Minimum number of special characters
  };
const registerUser=async(req,res)=>{
const {email, name, phoneNumber, password}=req.body
if(!email || !name || !phoneNumber || !password) return res.status(422).json({error:'Some fields are missing'})
if(!validator.isEmail(email)) return res.status(422).json({error:'Please provide a valid email'})
if(!validator.isMobilePhone(phoneNumber,'any',{strictMode:false})) return res.status(422).json({error:'Please provide a valid phone number'})
if(!validator.isStrongPassword(password,passRequirements)) return res.status(422).json({error:'Please provide a strong password'})
const isExistingUser=await USER.findOne({$or:[{email:email},{phoneNumber:phoneNumber}]})
if(isExistingUser) return res.status(409).json({error:'User already registered'})
const hashedPassword=await bcrypt.hash(password,parseInt(process.env.SALT_ROUNDS))
if(!hashedPassword) return res.status(500).json({error:'Could not hash password'})
const newUser=new USER({
    email,
    name,
    phoneNumber,
    password:hashedPassword
})
const createUser=await newUser.save()
if(createUser) return res.status(200).json({message:'User registered successfully'}) 
return res.status(500).json({error:'could not register user,try again'})
}


module.exports={registerUser}