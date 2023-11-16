//requiring all the modules
const express = require("express");
const mongoose = require("mongoose");
const UserModel = require("./models/Users");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const Razorpay = require("razorpay");
const {config} = require("dotenv");
const crypto = require("crypto");

//configuring env file to store environmental variable
config({path : "./.env"})

//inititating express module
const app = express();

//i have no idea why i used these middlewares --search on chatgpt
app.use(cors());
app.use(express.urlencoded({ extended: true }));

//for json stringify
app.use(express.json());

//using cookie middleware --however i dont think i used it here 
//but won't be removing it cus it will fill code with errors
app.use(cookieParser("CMS"));

//making instance for razorpay which has key and secret
var instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_API_SECRET,
});

console.log(process.env.RAZORPAY_API_KEY);
console.log(process.env.RAZORPAY_API_SECRET);

//connecting to database
mongoose
  .connect(
    process.env.DB,
    {}
  )
  .then(() => console.log("db connected"))
  .catch((err) => console.log(err));

//these are here so that there won't be any errors related to cross site accessing
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://cafemanagementsystem.netlify.app");
  res.header("Access-Control-Allow-Credentials", true);
  next();
});

//all of the request urls will have async function 
//cus all of them are returning data from database so need to wait for it

//authenticating user data with server 
//to check if user is there 
app.post("/getUser", async (req, res) => {

  try{

    //getting data from body
    const username = req.body.username;
    const password = req.body.password;

    //finding in database
    const Users = await UserModel.findOne({ username: username });

    //no user return   ? error
    if(Users == null){
      return res.send("error bruh")
    }

    //user returned also equal ? giving data back so cookie can be made on client side
    else if(username ===  Users.username && password === Users.password){
      return res.json({
        name: Users.name,
        username: Users.username,
      });
    }

    //if no condition satisfied --still an error bruh
    return res.send("error bruh");
    
  }catch(err){
    console.log(err);
  }
  
});

//creating a new user in database
app.post("/createUser", async (req, res) => {
  
  try{
    //getting data from request body
    const user = req.body;

    //creating new user in usermodel
    const newUser = new UserModel(user);
    
    //saving user 
    await newUser.save();
    res.json("newUser");
  }catch(err){
    console.log(err);
  }
});

//used for getting cart items from server 
app.post("/getCart",async (req,res) =>{

  //getting data from body
  const user = req.body.username;

  //finding user and all data there is
  const Users = await UserModel.findOne({ username: user });

  //getting cart and checking if its there 
  //cus i didnt gave any default values for cart
  if(Users?.cart != null){

    //cart exists ? return it else retun empty array
    Users.cart ? res.json(Users.cart) : res.json([]);
  }
})

//used for updating cart
app.post("/updateCart", async (req,res) =>{

    //getting data from client side
    const cart = req.body.cart;
    const username = req.body.username;
    const total = req.body.cartTotal;

    //finding user in database and updating cart and carttotal
    await UserModel.findOneAndUpdate({username: username}, {cart: cart, cartTotal : total});

    //sending response to client side
    res.send("Success");
})

//used for checkout payment
//all of functions for making razorpay order apply to instance
app.post("/checkout", async(req,res) =>{
  
  //making some options for razorpay
  const options = {
    amount: Number(req.body.amount * 100),  // converting amount to number and changing to paise
    currency: "INR",
  };

  //creating an order with razorpay method
  const order = await instance.orders.create(options).catch((err) => console.log(err));
  
  //sending true status to app and order also
  //to make it access there because request window will be made there
  res.status(200).json({
    success : true,
    order
  })
})

//verifying payment if its really made or someone just made some credentials by themselves ??
//this url is on callback_url in client side options in handlepayment so will be called from there
//it will run after user has made payment
app.post("/paymentverification", async(req,res) =>{

  //getting payment details
  const {razorpay_order_id, razorpay_payment_id,razorpay_signature} = req.body;

  let body=razorpay_order_id + "|" + razorpay_payment_id;

  //here its making expected signature
  const expectedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_API_SECRET)
                                  .update(body.toString())
                                  .digest('hex');

  //if server side expected signature match signatures 
  const isMatched = expectedSignature === razorpay_signature;
  if(isMatched){

    //fetching payment details from server by payment_id
    await instance.payments.fetch(razorpay_payment_id).then(async (payment) => {

      //destructuring the needed data from payment object
      const {amount,order_id,method,created_at} = payment;

      //to reset cart and total on mongoose database
      const cart = [];
      const total = 0;
      const {username} = req.query

      //formatting the date gotten from created_At
      const date = new Date(created_at * 1000); // Multiply by 1000 to convert seconds to milliseconds

      const time = date.toLocaleString('en-IN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        timeZoneName: 'short',
        timeZone: 'Asia/Kolkata'
      });
      
      // making order_details object
      const order_details = {amount,order_id,method,time}
      
      //updating orders and making cart empty
      const data = await UserModel.findOneAndUpdate(
        { username: username },
        { cart: cart, cartTotal : total, $push: { AllOrders: { $each: [order_details] } } },
        { new: true }
      );

    }).catch((error) => {
      console.log(error);
    });

    //redirecting to success payment page with payment_id
    res.redirect(`https://cafemanagementsystem.netlify.app/paymentsuccess?reference=${razorpay_payment_id}`);
  }else{

    //if not matched we will give error
    res.status(400).json({
      success : false
    })
  }
})

//for getting key to client side ---as we require it there
app.get("/getKey", (req,res) => {

  res.status(200).json({
    key : process.env.RAZORPAY_API_KEY
  })
})

//to get orders from server
app.post("/getOrders", async (req,res) =>{

  //same logic as getCart
  const {username} = req.body

  const User = await UserModel.findOne({username : username });

  if(User?.AllOrders != null){
    User.AllOrders ? res.json(User.AllOrders) : res.json([]);
  }

})

//server will be listening at port 5000
app.listen( process.env.PORT, () => {
  console.log(`server is listening on ${process.env.PORT}`);
});
