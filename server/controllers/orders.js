const UserModel = require("../models/Users.js");

const orders = async (req, res) => {

  const { username } = req.body;

  const User = await UserModel.findOne({ username: username });

  if (User?.AllOrders != null) {
    User.AllOrders ? res.json(User.AllOrders) : res.json([]);
  }
};


module.exports = orders;
