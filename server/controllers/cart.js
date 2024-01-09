const UserModel = require("../models/Users");

const getCart = async (req,res) =>{

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
}

const updateCart = async (req,res) =>{

    //getting data from client side
    const cart = req.body.cart;
    const username = req.body.username;
    const total = req.body.cartTotal;

    //finding user in database and updating cart and carttotal
    await UserModel.findOneAndUpdate({username: username}, {cart: cart, cartTotal : total});

    //sending response to client side
    res.send("Success");
}

module.exports = {getCart , updateCart};