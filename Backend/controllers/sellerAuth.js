const SELLER = require("../models/sellerModel");
const dotenv = require("dotenv");
dotenv.config({ path: "../.env" });
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validateUPI } = require("../utils/validateUpi");
const passRequirements = {
  minLength: 8, // Minimum length of the password
  minLowercase: 1, // Minimum number of lowercase characters
  minUppercase: 1, // Minimum number of uppercase characters
  minNumbers: 1, // Minimum number of digits
  minSymbols: 1, // Minimum number of special characters
};

//------------Register SELLER---------------//
const registerSeller = async (req, res) => {
  const { shopName, email, phoneNumber, upiId, password } = req.body;
  if (!shopName || !email || !phoneNumber || !password)
    return res.status(422).json({ error: "Some fields are missing" });
  const shopNameExists = await SELLER.findOne({ shopName: shopName });
  if (shopNameExists)
    return res
      .status(409)
      .json({ error: "Shop Name already registered, try another name" });
  if (!validator.isEmail(email))
    return res.status(422).json({ error: "Please provide a valid email" });
  if (!validator.isMobilePhone(phoneNumber, "any", { strictMode: false }))
    return res
      .status(422)
      .json({ error: "Please provide a valid phone number" });
  if (upiId && !validateUPI(upiId))
    return res.status(422).json({ error: "Please provide a valid upi id" });
  if (!validator.isStrongPassword(password, passRequirements))
    return res.status(422).json({ error: "Please provide a strong password" });
  const isExistingSeller = await SELLER.findOne({
    $or: [{ email: email }, { phoneNumber: phoneNumber }],
  });
  if (isExistingSeller)
    return res.status(409).json({ error: "Seller already registered" });
  const hashedPassword = await bcrypt.hash(
    password,
    parseInt(process.env.SALT_ROUNDS)
  );
  if (!hashedPassword)
    return res.status(500).json({ error: "Could not hash password" });
  const newSeller = new SELLER({
    shopName,
    email,
    phoneNumber,
    upiId,
    password: hashedPassword,
  });
  const createSeller = await newSeller.save();
  if (createSeller)
    return res.status(200).json({ message: "Seller registered successfully" });
  return res.status(500).json({ error: "Could not register seller,try again" });
};

//------------Login SELLER---------------//

const loginSeller = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(422).json({ error: "Some fields are missing" });
  if (!validator.isEmail(email))
    return res.status(422).json({ error: "Please provide a valid email" });
  const isExistingSeller = await SELLER.findOne({ email: email });
  if (!isExistingSeller)
    return res.status(404).json({ error: "Seller not found, please register" });
  const matchPassword = await bcrypt.compare(
    password,
    isExistingSeller.password
  );
  if (!matchPassword)
    return res.status(400).json({ error: "Passwords do not match" });
  const token = jwt.sign(
    {
      _id: isExistingSeller._id,
      shopName: isExistingSeller.shopName,
      email: email,
      name: isExistingSeller.name,
      phoneNumber: isExistingSeller.phoneNumber,
    },
    process.env.SECRET_KEY,
    { expiresIn: "1d" }
  );
  if (!token)
    return res.status(500).json({ error: "Could not generate token" });
  const {
    shopName,
    phoneNumber,
    upiId,
    myProducts,
    ordersList,
    approvedOrders,
    completedOrders,
    profilePic,
  } = isExistingSeller;
  return res.status(200).json({
    token,
    sellerData: {
      shopName,
      email,
      phoneNumber,
      upiId,
      myProducts,
      ordersList,
      approvedOrders,
      completedOrders,
      profilePic,
    },
  });
};

module.exports = { registerSeller,loginSeller };
