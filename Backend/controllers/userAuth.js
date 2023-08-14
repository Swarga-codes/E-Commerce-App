const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "../.env" });
const USER = require("../models/userModel");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const passRequirements = {
  minLength: 8, // Minimum length of the password
  minLowercase: 1, // Minimum number of lowercase characters
  minUppercase: 1, // Minimum number of uppercase characters
  minNumbers: 1, // Minimum number of digits
  minSymbols: 1, // Minimum number of special characters
};

//------------Register USER---------------//
const registerUser = async (req, res) => {
  const { email, name, phoneNumber, password } = req.body;
  if (!email || !name || !phoneNumber || !password)
    return res.status(422).json({ error: "Some fields are missing" });
  if (!validator.isEmail(email))
    return res.status(422).json({ error: "Please provide a valid email" });
  if (!validator.isMobilePhone(phoneNumber, "any", { strictMode: false }))
    return res
      .status(422)
      .json({ error: "Please provide a valid phone number" });
  if (!validator.isStrongPassword(password, passRequirements))
    return res.status(422).json({ error: "Please provide a strong password" });
  const isExistingUser = await USER.findOne({
    $or: [{ email: email }, { phoneNumber: phoneNumber }],
  });
  if (isExistingUser)
    return res.status(409).json({ error: "User already registered" });
  const hashedPassword = await bcrypt.hash(
    password,
    parseInt(process.env.SALT_ROUNDS)
  );
  if (!hashedPassword)
    return res.status(500).json({ error: "Could not hash password" });
  const newUser = new USER({
    email,
    name,
    phoneNumber,
    password: hashedPassword,
  });
  const createUser = await newUser.save();
  if (createUser)
    return res.status(200).json({ message: "User registered successfully" });
  return res.status(500).json({ error: "could not register user,try again" });
};

//------------Login USER---------------//

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(422).json({ error: "Some fields are missing" });
  if (!validator.isEmail(email))
    return res.status(422).json({ error: "Please provide a valid email" });
  const isExistingUser = await USER.findOne({ email: email });
  if (!isExistingUser)
    return res.status(404).json({ error: "User not found, please register" });
  const matchPassword = await bcrypt.compare(password, isExistingUser.password);
  if (!matchPassword)
    return res.status(400).json({ error: "Passwords do not match" });
  const token = jwt.sign(
    {
      _id: isExistingUser._id,
      email: email,
      name: isExistingUser.name,
      phoneNumber: isExistingUser.phoneNumber,
    },
    process.env.SECRET_KEY,
    { expiresIn: "1d" }
  );
  if (!token)
    return res.status(500).json({ error: "Could not generate token" });
  const { name, phoneNumber, wishList, cartItems, address, profilePic } =
    isExistingUser;
  return res
    .status(200)
    .json({
      token,
      userData: {
        email,
        name,
        phoneNumber,
        wishList,
        cartItems,
        address,
        profilePic,
      },
    });
};

module.exports = { registerUser, loginUser };
