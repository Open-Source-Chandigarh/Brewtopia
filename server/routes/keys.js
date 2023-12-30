require("dotenv").config();
const express = require("express");
const router = express.Router();

//for getting key to client side ---as we require it there
router.get("/getKey", (req,res) => {
    
    res.status(200).json({
      key : process.env.RAZORPAY_API_KEY
    })
})

module.exports = router