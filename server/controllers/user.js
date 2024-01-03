const UserModel = require("../models/Users");

const createUser = async (req, res) => {
  try {
    //getting data from request body
    const user = req.body;

    //creating new user in usermodel
    const newUser = new UserModel(user);

    //saving user
    await newUser.save();
    res.json("newUser");
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Error creating user",
    });
  }
};

const getUser = async (req, res) => {
  try {
    //getting data from body
    const username = req.body.username;
    const password = req.body.password;

    //finding in database
    const Users = await UserModel.findOne({ username: username });

    //no user return   ? error
    if (Users == null) {
      return res.send("error bruh");
    }

    //user returned also equal ? giving data back so cookie can be made on client side
    else if (username === Users.username && password === Users.password) {
      return res.json({
        name: Users.name,
        username: Users.username,
      });
    }

    //if no condition satisfied --still an error bruh
    return res.send("error bruh");
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Error retrieving user",
    });
  }
};

module.exports = { createUser, getUser };
