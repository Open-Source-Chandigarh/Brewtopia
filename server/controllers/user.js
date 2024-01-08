const bcryptjs = require("bcryptjs");
const UserModel = require("../models/Users");

const createUser = async (req, res) => {
  try {

    //getting data from request body
    const user = req.body;
    const password = user.password;

    if(!user || !password){
      res.json({error : "username and password is required"})
    }

    //checking if username already exists
    const existingUser = await UserModel.findOne({ username : user.username });

    if (existingUser) {
      return res.json({ error: "Username already exists" });
    }

    const salt = await bcryptjs.genSalt(11)
    const hashedPassword = await bcryptjs.hash(password, salt).catch(err => console.error("Error hashing password:", err));

    user.password = hashedPassword;
    //creating new user in usermodel
    const newUser = new UserModel(user);

    //saving user 
    await newUser.save();
    res.status(201).json({username : newUser.username});

  } catch (err) {
    res.json({error : "Server error"})
  }
}

const getUser = async (req, res) => {
  try {
    // Getting data from body
    const username = req.body.username;
    const password = req.body.password;

    if (!username || !password) {
      return res.json({ error: "Username and password are required" });
    }

    // Finding in database
    const user = await UserModel.findOne({ username: username });

    // No user found
    if (!user) {
      return res.json({ error: "User not found" });
    }

    const isValidPassword = await bcryptjs.compare(password, user.password);

    // Incorrect password
    if (!isValidPassword) {
      return res.json({ error: "Incorrect password" });
    }

    // Send user data
    return res.status(200).json({
      name: user.name,
      username: user.username,
    });

  } catch (err) {
    return res.json({ error: "Server error" });
  }
};

module.exports = { createUser, getUser };
