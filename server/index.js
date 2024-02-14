//requiring all the modules
const express = require("express");
const app = express();

const connectDb = require("./config/db.js")

const userRouter = require("./routes/user.js")
const cartRouter = require("./routes/cart.js")
const paymentRouter = require("./routes/payment.js")
const ordersRouter = require("./routes/orders.js")
const keysRouter = require("./routes/keys.js")

require("dotenv").config();

connectDb();

app.use(express.urlencoded({ extended: true }));
//for json stringify
app.use(express.json());

//allowed origins
const allowedOrigin = process.env.ACCESS_URL;


// Use a middleware function to set the header dynamically
app.use((req, res, next) => {

  res.header("Access-Control-Allow-Origin", allowedOrigin);
  // Set other CORS headers
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  // Call the next middleware function
  next();

});

app.use(userRouter);

app.use(cartRouter);

app.use(paymentRouter);

app.use(ordersRouter);

app.use(keysRouter);

//server will be listening at port 5000
app.listen( process.env.PORT, () => {
  console.log(`server is listening on ${process.env.PORT}`);
});