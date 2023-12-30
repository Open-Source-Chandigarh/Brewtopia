const express = require("express");
const router = express.Router();
const {getCart , updateCart} = require("../controllers/cart")

//used for getting cart items from server 
router.post("/getCart", getCart);

//used for updating cart
router.post("/updateCart", updateCart);

module.exports = router;