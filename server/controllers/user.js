const bcryptjs = require("bcryptjs");
const UserModel = require("../models/Users");
const nodemailer = require('nodemailer');
const Cookies =require("universal-cookie");
const jwt = require('jsonwebtoken');
const crypto = require("crypto");
const { response } = require("express");
require("dotenv").config();
const createUser = async (req, res) => {
  try {

    //getting data from request body
    const user = req.body;
    const password = user.password;

    if(!user || !password){
      res.json({error : "username and password is required"})
    }

    //checking if username already exists
    const existingUser = await UserModel.findOne({ username : user.username });

    if (existingUser) {
      return res.json({ error: "Username already exists" });
    }

    const salt = await bcryptjs.genSalt(11)
    const hashedPassword = await bcryptjs.hash(password, salt).catch(err => console.log(err))
  
    user.password = hashedPassword;
    //creating new user in usermodel
    const newUser = new UserModel(user);

    //saving user 
    await newUser.save();
    res.status(201).json({username : newUser.username});

  } catch (err) {
    console.log(err);
    res.json({error : "Server error"})
  }
}

const getUser = async (req, res) => {
  try {
    // Getting data from body
    const username = req.body.username;
    const password = req.body.password;

    if (!username || !password) {
      return res.json({ error: "Username and password are required" });
    }

    // Finding in database
    const user = await UserModel.findOne({ username: username });

    // No user found
    if (!user) {
      return res.json({ error: "User not found" });
    }
    console.log(username+"username")
    console.log(user.password+"expected password")
    console.log(password+"entered password")
   
    const isValidhashedPassword =  bcryptjs.compare(password.trim(), user.password.trim());
console.log(isValidhashedPassword+"valid password")
    // Incorrect password
    if (!isValidhashedPassword) {
      return res.json({ error: "Incorrect password" });
    }

    // Send user data
    return res.status(200).json({
      name: user.name,
      username: user.username,
    });

  } catch (err) {
    console.log(err);
    return res.json({ error: "Server error" });
  }
};

// forget-password route
const forgotPassword = async (req, res) => {
  try {
    const username = req.body.username;

    if (!username) {
      return res.status(400).json({ error: "Username is required" });
    }

    const user = await UserModel.findOne({ username: username });

    if (!user) {
      return res.json({ status: false });
    }

    return res.json({ status: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

//nodemailer configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.FROM_EMAIL_ADDRESS,
    pass: process.env.GOOGLE_APP_PASSWORD
  },
});

let resetdone=false;

const markTokenAsConsumed=async (req,res)=>{
 const {token,username}=req.body;
 try{
 const user = await UserModel.findOne({
  username: username,
  Tokens: {
    $elemMatch: {
      $eq: token
    }
  }
});
if(user)
res.status(200).json({ status: true, message: 'Token marked as consumed' });
else{
res.status(200).json({ status: false, message: 'Token marked as consumed' });

}

 }
 catch(err){
res.status(500).json({  message: 'Internal server error' });

   console.log(err);
 }
  
}

const sendEmail=async (req, res) => {
  const { to, username } = req.body;

 

 


  const payload={username:username,resetdone:resetdone}
const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '5m' });

  const resetLink =process.env.ACCESS_URL+`/resetpassword?token=${token}`;
  
  const mailOptions = {
    from: process.env.FROM_EMAIL_ADDRESS,
    to: to,
    subject: 'Password Reset',
    html: `
      <p>Hello ${username},</p>
      <p>We received a request to reset your password. Click the link below to reset your password:</p>
      <a href="${resetLink}" >Reset Password</a>
      <p>If you didn't request a password reset, you can ignore this email.</p>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
   
    console.log('Password reset email sent: ' + info.response);
    res.json({ success: true });
  } catch (error) {
    console.error('Error sending password reset email:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const resetPassword=async(req,res)=>{
  const { username, newPassword,token } = req.body;
  try{
    const result = await UserModel.updateOne(
      { username: username },
      {
        $set: {
          password: newPassword,
          // Create or update the 'Tokens' field
         
        },
        $addToSet: {
          Tokens: token
        }
      }
    );
    
 



  if (result.matchedCount === 1) {


    res.json({status:true})
    console.log(`Password updated for user with username ${username}`);
  } else {
    res.json({status:false})

    console.log(`User with username ${username} not found`);
  }
}
catch(error){
  res.json({error:"Internal server error"})

  console.log(error);
}
}

module.exports = { createUser, getUser,forgotPassword,sendEmail,resetPassword ,markTokenAsConsumed};
