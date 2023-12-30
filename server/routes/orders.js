const express = require("express");
const router = express.Router();

const orders = require("../controllers/orders");

router.post("/getOrders", orders);

module.exports = router;
