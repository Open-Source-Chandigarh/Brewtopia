require("dotenv").config();
const mongoose = require("mongoose");

//connecting to databa 
const connectDb = () =>{
  mongoose
  .connect(
    process.env.DB,
    {}
  )
  .then(() => console.log("db connected"))
  .catch((err) => console.log(err));
}

module.exports = connectDb;