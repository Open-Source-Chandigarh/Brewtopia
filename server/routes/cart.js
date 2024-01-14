const express = require("express");
const router = express.Router();
const {getCart , updateCart} = require("../controllers/cart");
const {cartLimiter} = require("../middleware/rateLimiter");

//used for getting cart items from server 
router.post("/getCart", cartLimiter, getCart);

//used for updating cart
router.post("/updateCart", cartLimiter, updateCart);

module.exports = router;