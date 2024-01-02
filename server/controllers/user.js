import bcryptjs from "bcryptjs"
const UserModel = require("../models/Users");

const createUser = async (req, res) => {
    try{
        const reqBody = await req.json()

        //getting data from request body
        const user = req.body;
        const {password} = reqBody;

        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)
        
        user.password = hashedPassword;
        //creating new user in usermodel
        const newUser = new UserModel(user);
        
        //saving user 
        await newUser.save();
        res.json("newUser");
    }catch(err){
        console.log(err);
    }
}

const getUser = async (req, res) => {

    try{
  
      //getting data from body
      const username = req.body.username;
      const password = req.body.password;
  
      //finding in database
      const Users = await UserModel.findOne({ username: username });
      const isValid = await bcryptjs.compare(password,Users.password);
      //no user return   ? error
      if(Users == null){
        return res.send("error bruh")
      }
  
      //user returned also equal ? giving data back so cookie can be made on client side
      else if(username ===  Users.username && isValid){
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
    
}

module.exports = {createUser , getUser};