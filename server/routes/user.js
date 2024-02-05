const express = require("express");
const router = express.Router();
const {createUser , getUser,forgotPassword,sendEmail,resetPassword,markTokenAsConsumed} = require("../controllers/user.js");
const {UserLimiter} = require("../middleware/rateLimiter.js");

router.post("/createUser", UserLimiter, createUser);

router.post("/getUser", UserLimiter, getUser);

router.post("/forgetpassword", UserLimiter, forgotPassword);

router.post("/sendEmail", UserLimiter, sendEmail);

router.post("/resetPassword", UserLimiter, resetPassword);
router.post("/tokenconsumed", UserLimiter, markTokenAsConsumed);


module.exports = router;