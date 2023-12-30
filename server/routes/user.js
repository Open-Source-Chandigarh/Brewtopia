const express = require("express");
const router = express.Router();
const {createUser , getUser} = require("../controllers/user.js")

router.post("/createUser", createUser);

router.post("/getUser", getUser);

module.exports = router;