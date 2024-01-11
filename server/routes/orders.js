const express = require("express");
const router = express.Router();
const orders = require("../controllers/orders");
const {orderLimiter} = require("../middleware/rateLimiter");

router.post("/getOrders", orderLimiter, orders);

module.exports = router;
