const express = require("express");
const router = express.Router();
const {createUser , getUser} = require("../controllers/user.js");
const {UserLimiter} = require("../middleware/rateLimiter.js");

router.post("/createUser", UserLimiter, createUser);

router.post("/getUser", UserLimiter, getUser);

module.exports = router;