const express = require("express");
const router = express.Router();
const {checkout , paymentverification} = require("../controllers/payment");
const {paymentLimiter} = require("../middleware/rateLimiter");

//used for checkout payment
//all of functions for making razorpay order apply to instance
router.post("/checkout", paymentLimiter,checkout)
  
//verifying payment if its really made or someone just made some credentials by themselves ??
//this url is on callback_url in client side options in handlepayment so will be called from there
//it will run after user has made payment
router.post("/paymentverification", paymentLimiter, paymentverification)

module.exports = router;